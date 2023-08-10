const appdesignation = require('../../models/designation');

 module.exports=async (req, res) => {
    const { designation_name, userid,addedbyUser } = req.body;  
    try {       
      // Create the new contact document
      const newDesignation = new appdesignation({ userid, designation_name,addedbyUser });
      await newDesignation.save();
      res.status(201).json({ message: 'Designation added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };