const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const multerS3 = require('multer-s3');
const blog = require("../../models/blogs");
const Profile = require('../../models/Profile')
const category = require('../../models/blogCategories')
const moment = require("moment-timezone");
// Configure multer to handle file uploads
const storage = multer.memoryStorage();

const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");

// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', //  bucket name
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `blog-images/${file.originalname}`);
    },
  }),
});


// Define API endpoint for posting photos/videos
module.exports = async (req, res) => {
  try {
    // const category_id=req.body.category_id;
    let mediaUrl;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {

      const params = {
        Bucket: 'rown-bucket', //  S3 bucket name
        Key: `blog-images/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/blog-images/${req.file.originalname}`;
    }

    const User_id = req.body.User_id;
    const userProfile = await Profile.findOne({ User_id: User_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }
    const { Profile_pic, User_name, Full_name, verificationStatus } = userProfile;

    // const categorys = await category.findOne({ category_id:category_id  });
    // if (!categorys) {
    //   return res.status(404).json({ message: "not found" });
    // }
    // const { category_name } = categorys;
    // Create a new post object with the uploaded media URL or undefined
    const post = new blog({
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      User_id: User_id,
      likes: req.body.likes,
      comments: req.body.comments,
      date_added: date_added,
      // category_id:category_id,
      saved_blog: req.body.saved_blog,
      blog_image: mediaUrl,
      Profile_pic: Profile_pic,
      User_name: User_name,
      Full_name: Full_name,
      verificationStatus: verificationStatus,
      category_name: req.body.category_name
    });

    // Save the post to the database
    await post.save();
    res.status(201).send({ message: "Blog created successfully" })
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'something wrong' });
  }
};

