const userGroup = require('../../models/userGroup');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const group_id = req.params.group_id;
    const { user_id } = req.body;

    const userProfile = await Profile.findOne({ User_id: req.body.user_id });
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    const { Full_name,Profile_pic, verificationStatus, location,Role,Mesibo_account } = userProfile;
    const mesibouid =Mesibo_account[0].uid;
    const mesiboaddress =Mesibo_account[0].address;
    const group = await userGroup.findOne({ group_id });
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    const memberIndex = group.Members.findIndex((member) => member.user_id === user_id);
    if (memberIndex !== -1) {
      return res.status(404).json({ message: "Member already exists in the group" });
    }
    const newMember = {
      Full_name,
      address:mesiboaddress,
      uid:mesibouid,
      user_id,
      Profile_pic,
      Role,
      verificationStatus,
      location,
      admin: "false",
    };

    group.Members.push(newMember);
    await group.save();

    return res.json({ message: "Member added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
