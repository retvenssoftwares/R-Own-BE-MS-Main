const Profile  = require("../../models/Profile");
module.exports= async (req, res) => {
    try {
      const user = await Profile.findOne({ User_id: req.params.User_id });
      //console.log(user);
  
      if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
      }
  
      const { intid } = req.body;
  
      // Check if the interest already exists in the Interest array
      const interestExists = user.Interest.some((interest) => interest.intid === intid);
  
      if (interestExists) {
        return res.status(400).json({ message: 'Interest already exists.' });
      }
  
      user.Interest.push({ intid });
  
      await user.save();
  
      res.json({ message: 'Interest added successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };