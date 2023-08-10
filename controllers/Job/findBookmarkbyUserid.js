const Job = require('../../models/job');
const profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profileData = await profile.findOne({ user_id }, 'Bookmarkjob');

    // Fetch all job applications for the user
    const jobIds = profileData.Bookmarkjob.map(bookmark => bookmark.jid);

    // Fetch job details for the bookmarked job IDs
    const jobs = await Job.find({ jid: { $in: jobIds } });

    res.json(jobs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
