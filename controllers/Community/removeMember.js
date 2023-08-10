// // const service = require('../../models/service');
// const group = require('../../models/userGroup');

// module.exports = async (req, res) => {
//   try {
//     const { group_id } = req.params;
//     const { user_id, isAdmin } = req.body;

//     // Find the group by group_id
//     const grp = await group.findOne({ group_id });

//     if (!grp) {
//       return res.status(404).json({ message: "Group not found" });
//     }

//     // Check  user_id exists in the Members array
//     const memberIndex = grp.Members.findIndex((member) => member.user_id === user_id);

//     if (memberIndex === -1) {
//       return res.status(404).json({ message: "User not found in the group" });
//     }

//     if (isAdmin) {
//       // Admin request: Check if the provided user_id exists in the Admin array
//       const adminIndex = grp.Admin.findIndex((admin) => admin.user_id ===isAdmin);

//       if (adminIndex === -1) {
//         return res.status(403).json({ message: "Admin not found" });
//       }

//       // Remove the object from the Members array for admin request
//       grp.Members.splice(memberIndex, 1);

//       // Save the updated group
//       await grp.save();

//       return res.status(200).json({ message: 'User removed from the group by admin successfully' });
//     } else {
//       // Regular user request: Remove the object from the Members array
//       grp.Members.splice(memberIndex, 1);

//       // Save the updated group
//       await grp.save();

//       return res.status(200).json({ message: 'User removed from the group by regular user successfully' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// const service = require('../../models/service');

const fetch = require('node-fetch');
const profile = require('../../models/Profile');
const group = require('../../models/userGroup');

module.exports = async (req, res) => {
  try {
    const { group_id } = req.params;
    const { user_id, isAdmin } = req.body;

    const findAddress = await profile.findOne({User_id: user_id});

    const {Mesibo_account} = findAddress;
    const mesiboAddress = Mesibo_account[0].address

    const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
    const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';

     // Leave the group using Mesibo API
     const response = await fetch(`${MESIBO_API_ENDPOINT}?token=${MESIBO_API_TOKEN}&op=groupeditmembers`, {
      method: 'DELETE',
      body: JSON.stringify({
        op: "groupeditmembers",
        group: {
          gid: group_id,
          members: {
            m:mesiboAddress,
            remove:1,
            admin:{
              remuser:true
            }
          },
          
        },
        token: MESIBO_API_TOKEN
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    // Find the group by group_id
    const grp = await group.findOne({ group_id });

    if (!grp) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check  user_id exists in the Members array
    const memberIndex = grp.Members.findIndex((member) => member.user_id === user_id);

    if (memberIndex === -1) {
      return res.status(404).json({ message: "User not found in the group" });
    }

    if (isAdmin) {
      // Admin request: Check if the provided user_id exists in the Admin array
      const adminIndex = grp.Admin.findIndex((admin) => admin.user_id ===isAdmin);

      if (adminIndex === -1) {
        return res.status(403).json({ message: "Admin not found" });
      }

      // Remove the object from the Members array for admin request
      grp.Members.splice(memberIndex, 1);

      // Save the updated group
      await grp.save();

      return res.status(200).json({ message: 'User removed successfully' });
    } else {
      // Regular user request: Remove the object from the Members array
      grp.Members.splice(memberIndex, 1);

      // Save the updated group
      await grp.save();

      return res.status(200).json({ message: 'User removed successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
