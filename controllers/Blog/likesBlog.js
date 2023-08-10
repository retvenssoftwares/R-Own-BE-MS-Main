const Blog = require("../../models/blogs");
//const profile = require("../../models/Profile");
const moment = require("moment-timezone");
module.exports = async (req, res) => {
  const blog_id = req.params.blog_id;
  const { user_id } = req.body;
  const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");

  try {
    const post = await Blog.findOne({blog_id });
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    // const userProfile = await profile.findOne({ User_id: user_id });
    // if (!userProfile) {
    //   return res.status(404).json({ message: "user profile not found" });
    // }

    //const { Profile_pic, User_name } = userProfile;
    const newlike = { user_id,date_added};
    const requestfound = post.likes.some((request) => request.user_id === user_id);

    if (requestfound) {
     post.likes = post.likes.filter((request) => request.user_id !== user_id);
      await post.save();
      res.json({ message: "blog post not liked" });
    } else {
      post.likes.push(newlike);
      await post.save();
      res.json({ message: "like added successfully" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
