
const job = require('../../models/job')
module.exports= async (req, res) => {
    try {
      
      const data = await job.findOne({jid:req.params.jid});
     
  
      if (!data) {
        res.status(404).json({ error: 'job not found.' });
        return;
      }
      
      //put the user_id of jobaaplicant 
      const { user_id,applicationId } = req.body;
  
      
     
      
      data.jobApplicants.push({ user_id,applicationId });
     
      await data.save();
      
  
      res.json({ message: 'user_id added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
    }
  };