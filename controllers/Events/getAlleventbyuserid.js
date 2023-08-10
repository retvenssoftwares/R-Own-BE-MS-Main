const event = require('../../models/events');
const profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const user_id = req.params.User_id;
    const Blog = await event.find({ User_id: user_id }).sort({date_added:-1});
    const profiles = await profile.find({});

    const result = Blog.map(job => {
      const matchingProfile = profiles.find(profile => profile.User_id === job.User_id);
      if (!matchingProfile) {
        return {
          ...job.toObject(),
          User_name: null,
          Profile_pic: null,
          verificationStatus: null
        };
      } else {
        return {
          ...job.toObject(),
          User_name: matchingProfile.User_name,
          Profile_pic: matchingProfile.Profile_pic,
          verificationStatus: matchingProfile.verificationStatus
        };
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};