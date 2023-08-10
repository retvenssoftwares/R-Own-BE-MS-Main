

  //get by id
// const getgroup = require("../../models/userGroup");

// module.exports = (req, res) => {
//   const groupid = req.params.group_id;
//   getgroup
//     .findOne({ group_id: groupid }, 'Profile_pic group_name description date_added creator_name Members')
//     .then((document) => {
//       const memberCount = document.Members.length;
//       const response = {
//         //document: {
//           Profile_pic: document.Profile_pic,
//           group_name: document.group_name,
//           description: document.description,
//           date_added: document.date_added,
//           creator_name: document.creator_name,
//        // },
//         Members: memberCount,
//       };
//       res.json(response);
//     })
//     .catch((err) => res.status(404).json({ success: false }));
// };


const getgroup = require("../../models/userGroup");

module.exports = (req, res) => {
  const groupid = req.params.group_id;
  getgroup
    .findOne(
      { group_id: groupid },
      'Profile_pic group_name community_type description date_added creator_name Members Admin latitude longitude location'
    )
    .then((document) => {
      const memberCount = document.Members.length;
      const adminCount = document.Admin.length;
      const totalmember = memberCount + adminCount;
      const response = {
        Profile_pic: document.Profile_pic,
        group_name: document.group_name,
        description: document.description,
        date_added: document.date_added,
        creator_name: document.creator_name,
        date_added: document.date_added,
        Admin:document.Admin,
        Members:document.Members,
        latitude: document.latitude,
        longitude: document.longitude,
        // Members: memberCount,
        // Admin: adminCount,
        community_type: document.community_type,
        Totalmember: totalmember,
        location: document.location
      };
      res.json(response);
    })
    .catch((err) => res.status(404).json({ success: false }));
};
