
const Profile = require("../../models/Profile");
const hotelinfo = require('../../models/Hotels')
const post = require('../../models/Post')

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;
    const { conn_user_id } = req.params;

    const profiledata = await Profile.findOne(
      { User_id: User_id },
      'userBio User_name Full_name post_count Profile_pic Mesibo_account'
    );
    const data1 = await Profile.findOne({ User_id: User_id }).select('connections');
    const data2 = await Profile.findOne({ User_id: User_id }).select('requests');
    const data3 = await Profile.findOne({User_id: conn_user_id}).select('requests');
    // Count the length of connections excluding those with display_status of '0'
    const connection_Count = data1.connections.reduce((count, connection) => {
      if (connection.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    // Count the length of requests excluding those with display_status of '0'
    const requests_count = data2.requests.reduce((count, request) => {
      if (request.display_status !== '0') {
        return count + 1;
      }
      return count;
    }, 0);

    const post_count = profiledata.post_count.length;

    const hotellogo = await hotelinfo.findOne({ User_id: User_id }, 'hotelLogoUrl');

    const profile = await Profile.findOne({ User_id: req.params.User_id }).select('hotelOwnerInfo.hotelDescription hotelOwnerInfo.websiteLink verificationStatus Created_On location Role');
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
      profiledata,
      hotellogo,
      connection_Count,
      requests_count,
      post_count,
      profile,
      connectionStatus
    };

    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
