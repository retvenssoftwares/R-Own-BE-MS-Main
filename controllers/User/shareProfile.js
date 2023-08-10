const Profile = require("../../models/Profile");

module.exports= async (req, res) => {
    try {
        const userid =req.params.user_id;
        const roleDetails = await Profile.find({User_id:userid},'Full_name Profile_pic verificationStatus userBio User_name Role User_id');
      
      if (roleDetails) {
        res.send(roleDetails);
      } else {
        res.json({message: "No match found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  };