// const jobApplication = require('../../models/jobApplication');
const job = require('../../models/job');
const profile = require('../../models/Profile')

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Fetch all job applications for the user
    const jobappi = await job.findOne({ user_id });

    const data = jobappi.user_id

    
    
    const jobs = await profile.findOne({ user_id: { $in: data } },"Role Full_name Profile_pic verificationStatus");

    const companydata = await job.findOne({user_id: { $in: data }}, 'companyName');
    
    const alldata = {
      jobs,
      companydata
      
    };

    res.status(200).json(alldata);
    

    // return res.status(200).json(jobApplicationsWithJobData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
