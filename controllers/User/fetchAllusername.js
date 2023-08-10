const Profile = require("../../models/Profile");

module.exports= async (req, res) => {
    try {
      const roleDetails = await Profile.find().select('User_name');
      
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