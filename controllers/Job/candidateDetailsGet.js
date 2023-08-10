
const Job = require('../../models/jobApplication');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const application_id = req.params.applicationId;
    const job = await Job.find({ applicationId: application_id });
    const profiles = await Profile.find({});

    const result = job.map(job => {
      const matchingProfile = profiles.find(profile => profile.User_id === job.user_id);
      if (!matchingProfile) {
        return {
          ...job.toObject(),
          User_name: null,
          Profile_pic: null,
          verificationStatus: null,
          jobType: null // Add jobType with null value
        };
      } else {
        return {
          ...job.toObject(),
          User_name: matchingProfile.User_name,
          Profile_pic: matchingProfile.Profile_pic,
          verificationStatus: matchingProfile.verificationStatus,
          jobType: matchingProfile.normalUserInfo.map(info => info.jobType) // Fetch jobType from normalUserInfo
        };
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
