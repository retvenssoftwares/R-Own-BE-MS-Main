const requestjob = require('../../models/requestjob');
const profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const posts = await requestjob.find({userID:req.params.userID});
    console.log(posts)
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: 'Job posts not found' });
    }

    const profiles = await profile.find({});

    if (!profiles || profiles.length === 0) {
      return res.status(404).json({ error: 'Profiles not found' });
    }

    const postWithProfile = posts.map(post => {
      const userId = post.userID;
      const matchingProfile = profiles.find(profile => profile.User_id === userId);

      if (matchingProfile) {
        const postProfile = {
          ...post.toObject(),
          Full_name: matchingProfile.Full_name,
          profile_pic: matchingProfile.Profile_pic,
          verificationStatus: matchingProfile.verificationStatus,
          Location: matchingProfile.location,
          jobType: [],
          jobTitle: []
        };

        matchingProfile.normalUserInfo.forEach(normaluser => {
          postProfile.jobType.push(normaluser.jobType);
          postProfile.jobTitle.push(normaluser.jobTitle);
        });

        return postProfile;
      }

      return null;
    }).filter(Boolean);

    if (postWithProfile.length === 0) {
      return res.status(404).json({ error: 'No matching profile found for the job posts' });
    }
    console.log(postWithProfile)
    return res.status(200).json(postWithProfile);
   
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
