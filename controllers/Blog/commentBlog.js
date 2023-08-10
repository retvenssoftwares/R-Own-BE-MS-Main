
const shortid = require('shortid');
//models
const blog  = require("../../models/blogs");
const profile = require('../../models/Profile')
const moment = require("moment-timezone");
module.exports= async (req, res) => {
  const blog_id = req.params.blog_id;
  const { user_id, comment } = req.body;
  const comment_id = shortid.generate();
  const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");
  
  try {
    const post = await blog.findOne({ blog_id });
    if (!post) {
      return res.status(404).json({ message: "blog not found" });
    }

    const userProfile = await profile.findOne({ User_id: user_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }


    const { Profile_pic, User_name, Full_name, verificationStatus, Role } = userProfile;
    //console.log(Profile_pic);
    const newComment = { user_id, comment,Profile_pic, User_name: User_name, Full_name: Full_name, verificationStatus: verificationStatus, Role: Role, comment_id,date_added};
    post.comments.push(newComment);
    await post.save();
    
    return res.json({ message: "Comment added successfully"});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};