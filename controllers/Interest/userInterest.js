// Define the POST API endpoint
const Profile  = require("../../models/interest");
module.exports =async (req, res) => {
    try {
      
      const {  Name, User_list} = req.body;
  
      // Create a new Interest document
      const interest = new Profile({ Name, User_list});
  
      // Save the Interest document to the database
      await interest.save();
      
  
      // Send a success response
      res.json({ message: 'Interest added successfully.' });
    } catch (err) {
      // Send an error response if something goes wrong
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };