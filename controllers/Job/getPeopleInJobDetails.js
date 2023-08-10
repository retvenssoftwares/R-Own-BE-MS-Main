// const vendor = require('../../models/service');
// const hotel = require('../../models/Hotels');
// const Profile = require('../../models/Profile');

// module.exports = async (req, res) => {
//   try {
//     const user_id = req.params.user_id;
//     const vendorUser = await vendor.findOne({ user_id });
//     const hotelUser = await hotel.findOne({ user_id });

//     let profileUser;
//     if (vendorUser) {
//       profileUser = await Profile.findOne({ User_id: user_id });
//     } else if (hotelUser) {
//       profileUser = await Profile.findOne({ User_id: user_id });
//     } else {
//       return res.status(404).json({ message: 'User not found in Vendor or hotel' });
//     }

//     if (profileUser) {
//       const { Role, Full_name, Profile_pic, User_id } = profileUser;
//       return res.json({ Role, Full_name, Profile_pic, User_id });
//     } else {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

const vendor = require('../../models/service');
const hotel = require('../../models/Hotels');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const name = req.params.name;
    const vendorUser = await vendor.findOne({ user_id :user_id});
    const hotelUser = await hotel.findOne({ user_id:user_id });

    let profileUser;
    if (vendorUser) {
      profileUser = await Profile.findOne({ User_id: user_id });
    } else if (hotelUser) {
      profileUser = await Profile.findOne({ User_id: user_id });
    } else {
      return res.status(404).json({ message: 'User not found in Vendor or hotel' });
    }

    if (profileUser) {
      const { Role, Full_name, Profile_pic, verificationStatus, User_id } = profileUser;
      let matchedRecords = [];

      if (name) {
        matchedRecords = profileUser.normalUserInfo.filter(info => info.jobTitle === name)
          .map(info => ({
            Profile_pic: info.Profile_pic,
            Full_name: info.Full_name,
            verificationStatus: info.verificationStatus,
            jobTitle: info.jobTitle
          }));

        matchedRecords = matchedRecords.concat(profileUser.hospitalityExpertInfo.filter(info => info.jobtitle === name)
          .map(info => ({
            Profile_pic: info.Profile_pic,
            Full_name: info.Full_name,
            verificationStatus: info.verificationStatus,
            jobTitle: info.jobtitle
          })));
      }

      const data = {
        Role,
        Full_name,
        Profile_pic,
        User_id,
        verificationStatus,
        matchedRecords,
      };

      return res.json(data);
    } else {
      return res.status(404).json({ message: 'Profile not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
