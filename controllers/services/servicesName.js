const service =require('../../models/brandservices')

 module.exports=async (req, res) => {
    const { service_name,display_status} = req.body;  
    try {       
      // Create the new contact document
      const newname = new service({ service_name,display_status });
      await newname.save();
      res.status(201).json({ message: ' services name added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };