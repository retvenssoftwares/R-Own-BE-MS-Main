

const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { conn_user_id } = req.params;

    const profile = await Profile.findOne(
      { User_id: user_id },
      'User_name post_count User_id Full_name Profile_pic Role normalUserInfo.jobTitle userBio verificationStatus Created_On location Mesibo_account hospitalityExpertInfo');

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const data1 = await Profile.findOne({ User_id: user_id }).select('connections');
    const data2 = await Profile.findOne({ User_id: user_id }).select('requests');
    const data3 = await Profile.findOne({User_id: conn_user_id}).select('requests');

    const postCountLength = profile.post_count.length;

    // Count the length of connections excluding those with display_status of '0'
    const connCountLength = data1.connections.reduce((count, connection) => {
      if (connection.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    // Count the length of requests excluding those with display_status of '0'
    const reqsCountLength = data2.requests.reduce((count, request) => {
      if (request.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    const connArray = data1.connections.filter((daat) => daat.user_id === conn_user_id);
    const requestarray = data2.requests.filter((requestdata) => requestdata.user_id === conn_user_id);
    const thirdarray = data3.requests.filter((requestdata) => requestdata.user_id === user_id);

    let connectionStatus = "";

    if (connArray.length > 0) {
      connectionStatus = "Connected";
    } else {
      if (requestarray.length > 0) {
        connectionStatus = "Requested";
      } else if(thirdarray.length > 0) {
        connectionStatus = "Confirm request";
      }else{
        connectionStatus = "Not connected";
      }
    }

    const data = {
      profile,
      postCountLength,
      connCountLength,
      reqsCountLength,
      connectionStatus
    };

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



