
const blog = require('../../models/blogs');

module.exports = async (req, res) => {
  try {
    const post = await blog.findOne({ blog_id: req.params.blog_id });
    if (!post) {
      return res.status(404).json({ error: 'blog not found' });
    }
    
    return res.status(200).json([post.comments]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};