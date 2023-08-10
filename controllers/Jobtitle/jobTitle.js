const job =require('../../models/jobtitle')

 module.exports=async (req, res) => {
    const { job_title} = req.body;  
    try {       
      // Create the new contact document
      const newname = new job({ job_title });
      await newname.save();
      res.status(201).json({ message: 'job_title added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };