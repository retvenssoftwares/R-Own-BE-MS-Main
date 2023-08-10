//models
const Profile  = require("../../models/Profile");

module.exports= async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const post_id = req.body.post_id;

    // Find the profile using the user_id
    const profile = await Profile.findOne({ User_id: user_id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Add the new post_id to the saved_post array
    const newComment = { post_id};
    profile.Liked_post.push(newComment);

    // Update the profile in the database
    await profile.save();

    return res.status(200).json({ message: 'Liked post saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};