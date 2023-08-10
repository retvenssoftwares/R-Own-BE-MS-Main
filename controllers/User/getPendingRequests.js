//models path
const { ProfilingLevel } = require('mongodb');
const Profile = require('../../models/Profile');

module.exports= async (req, res) => {
    try {
      const post = await Profile.findOne({ User_id: req.params.User_id });
      if (!post) {
        return res.status(404).json({ error: 'profile not found' });
      }
      return res.status(200).json(post.pending_request);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };