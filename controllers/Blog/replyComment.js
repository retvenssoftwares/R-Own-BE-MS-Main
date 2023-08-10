const shortid = require('shortid');
//models
const blog  = require("../../models/blogs");
const profile = require('../../models/Profile')
const moment = require("moment-timezone");
module.exports= async (req, res) => {
  const blog_id = req.params.blog_id;
  const { user_id, comment, parent_comment_id } = req.body;
  const comment_id = shortid.generate();
  const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");

  try {
    const post = await blog.findOne({ blog_id });
    if (!post) {
      return res.status(404).json({ message: "blog not found" });
    }

    const userProfile = await profile.findOne({ User_id: user_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }

    
    // Find the parent comment and push the new reply
    let parentComment = post.comments.find(comment => comment.comment_id === parent_comment_id);
    if (!parentComment) {
      return res.status(404).json({ message: "Parent comment not found" });
    }

    // Add the new reply to the parent comment
    const { Profile_pic, User_name, Full_name, verificationStatus, Role } = userProfile;
    const newReply = { user_id, comment, comment_id, Profile_pic, Full_name:Full_name, User_name: User_name, verificationStatus: verificationStatus, Role: Role, parent_comment_id, date_added };
    parentComment.replies.push(newReply);
    await post.save();

    return res.json({ message: "Reply added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
