//models
const Blog = require("../../models/blogs");

module.exports = async (req, res) => {
  try {
    const { blog_id } = req.params;

    const post = await Blog.findOne({ blog_id });
    if (!post) {
      return res.status(404).send('Post not found');
    }

    const likes = post.likes;

    res.status(200).json({ likes });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
