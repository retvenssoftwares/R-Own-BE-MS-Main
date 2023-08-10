const Profile = require("../../models/Profile");

module.exports = async (req, res) => {
  try {
    const User_id = req.params.User_id;
    const conn_user_id = req.params.conn_user_id;

    const roleDetails = await Profile.findOne(
      { User_id: User_id },
      'Profile_pic userBio Full_name User_name vendorInfo post_count verificationStatus Created_On location Mesibo_account Role');
    const data1 = await Profile.findOne({ User_id: User_id }).select('connections');
    const data2 = await Profile.findOne({ User_id: User_id }).select('requests');
    const data3 = await Profile.findOne({User_id: conn_user_id}).select('requests');
    // Count the length of connections excluding those with display_status of '0'
    
    const connectioncount = data1.connections.reduce((count, connection) => {
      if (connection.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    // Count the length of requests excluding those with display_status of '0'
    const requestcount = data2.requests.reduce((count, request) => {
      if (request.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    const postcount = roleDetails.post_count.length;

    const connArray = data1.connections.filter((daat) => daat.user_id === conn_user_id);
    const requestarray = data2.requests.filter((requestdata) => requestdata.user_id === conn_user_id);
    const thirdarray = data3.requests.filter((requestdata) => requestdata.user_id === User_id);

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
      roleDetails,
      postcount,
      connectioncount,
      requestcount,
      connectionStatus
    };

    if (data) {
      res.send(data);
    } else {
      res.json({ message: "No match found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};



