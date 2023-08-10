
const job = require('../../models/job');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const Job = await job.findOne({ jid: req.params.jid });
    if (!Job) {
      return res.status(404).json({ error: 'job not found' });
    }

    const userIds = Job.jobApplicants.map(jobApplicant => jobApplicant.user_id);

    const profiles = await Profile.aggregate([
      {
        $match: { User_id: { $in: userIds } }
      },
      {
        $project: {
          User_id: 1,
          Full_name: 1,
          Profile_pic: 1,
          verificationStatus: 1,
          location: 1,
          jobTitle: { $arrayElemAt: ['$normalUserInfo.jobTitle', 0] }
        }
      }
    ]);

    const commentsWithProfile = Job.jobApplicants
      .map(jobApplicant => {
        const profile = profiles.find(profile => profile.User_id.toString() === jobApplicant.user_id.toString());
        if (profile) {
          return { ...jobApplicant.toObject(), Full_name: profile.Full_name, Profile_pic: profile.Profile_pic,verificationStatus: profile.verificationStatus, Location: profile.location, jobTitle: profile.jobTitle };
        } else {
          return null;
        }
      })
    return res.status(200).json(commentsWithProfile);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
