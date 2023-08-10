
// const userGroup = require('../../models/userGroup');

// module.exports= async (req, res) => {
//   try {
//     const group_id = req.params.group_id;
//     const {user_id} = req.body;
    
//     const group = await userGroup.findOne({ group_id });
//     if (!group) {
//       return res.status(404).json({ message: "Group not found" });
//     }
//     const userid = await userGroup.findOne({ "Members.user_id":userid });
//     if (!userid) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     const newAdmin = { user_id};
//     group.Admin.push(newAdmin);
//     await group.save();
    
//     return res.json({ message: "user_id added successfully"});
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

const userGroup = require('../../models/userGroup');

module.exports = async (req, res) => {
  try {
    const group_id = req.params.group_id;
    const { user_id } = req.body;

    const group = await userGroup.findOne({ group_id });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const memberIndex = group.Members.findIndex((member) => member.user_id === user_id);
    if (memberIndex === -1) {
      return res.status(404).json({ message: "Member  not found" });
    }

    const member = group.Members[memberIndex];
    group.Members.splice(memberIndex, 1);
    member.admin = "true";
    group.Admin.push(member);
    await group.save();

    return res.json({ message: "user_id added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
