
const jobApplication = require('../../models/jobApplication');
const job = require('../../models/job');

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Fetch all job applications for the user
    const jobApplications = await jobApplication.find({ user_id });

    if (jobApplications.length === 0) {
      return res.status(404).json({ error: 'No job applications found for the user' });
    }

    // Extract the jid values from job applications
    const jids = jobApplications.map(application => application.jid);

    // Fetch the job details for the extracted jids
    const jobs = await job.find({ jid: { $in: jids } });

    // Map the job data with the job applications
    const jobApplicationsWithJobData = jobApplications.map(application => {
      const jobData = jobs.find(job => job.jid === application.jid);

      return {
        ...application.toObject(),
        jobData
      };
    });

    return res.status(200).json(jobApplicationsWithJobData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
