const JobData = require('../../models/job');
const Profile = require('../../models/Profile');
const saved = require('../../models/saved');
const JobStatus = require('../../models/jobApplication');

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;

    const profiles = await Profile.find({ User_id: User_id });
  
    const save = await saved.find({ user_id: User_id });
    const jobstatus = await JobStatus.find({ user_id: User_id });
    const jobData = await JobData.find({});
    const result = jobData.map((job) => {
      const matchingProfile = save.find((profile) =>
        profile.saveall_id.Jobs.some((savedJob) => savedJob.jobid === job.jid)
      );

      const matchingStatus = jobstatus.some((status) => status.jid === job.jid);

      let saved = 'not saved';
      let applyStatus = 'Not Applied';
      let profileData = null;
      if (matchingProfile && profiles.length > 0) {
        const matchingProfileData = profiles.find((profile) =>
          profile.User_id === matchingProfile.user_id
        );
        if (matchingProfileData) {
          saved = 'saved';
          profileData = {
            User_name: matchingProfileData.User_name,
            Profile_pic: matchingProfileData.Profile_pic,
            verificationStatus: matchingProfileData.verificationStatus
          };
        }
      }
      if (matchingStatus) {
        applyStatus = 'Applied';
      }

      return {
        ...job.toObject(),
        saved: saved,
        applyStatus: applyStatus,
        profileData: profileData,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
