const reportUser = require('../../models/report');
const moment = require('moment-timezone');

 module.exports=async (req, res) => {
    const { reportType, reporterUserId, reportedUserId,post_id,Reason } = req.body;  
    
    try {       
      // Create the new contact document
      const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");
      const newReport = new reportUser({ reportType, reporterUserId, reportedUserId,post_id,Reason,date_added: date_added });
      await newReport.save();
      res.status(201).json({ message: 'Reported successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };