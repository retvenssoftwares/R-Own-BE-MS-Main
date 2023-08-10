const Interest  = require("../../models/interest");
module.exports =async (req, res) => {
    try {
      // Get the ID of the interest to update
    
      // Find the Interest document with the given ID
      const interest = await Interest.findOne({id:req.params.id});
      
  
      // Check if the Interest document exists
      if (!interest) {
        res.status(404).json({ error: 'Interest not found.' });
        return;
      }
  
      // Extract the interest data from the request body
      const { User_id } = req.body;
  
      // Update the interest data in the document
      if (User_id && !interest.User_list.includes(User_id)) {
                interest.User_list.push(User_id);

      }
 
  
      // Save the updated Interest document to the database
      await interest.save();
  
      // Send a success response
      res.json({ message: 'Interest updated successfully.' });
    } catch (err) {
      // Send an error response if something goes wrong
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };