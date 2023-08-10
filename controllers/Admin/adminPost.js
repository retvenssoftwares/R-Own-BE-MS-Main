const multer = require('multer')
const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const adminpost = require("../../models/adminPost");
const Profile = require('../../models/Profile')
const multerS3 = require('multer-s3');
const FeedCache = require("../../models/feedcache");
//const Profile = require("../../models/feedcache");
const moment = require('moment-timezone');

// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `admin-posts/${file.originalname}`);
    },
    // acl: 'public-read', // Set the ACL to public-read
  }),
});


module.exports = async (req, res) => {
  try {

    const user_id = req.params.user_id;
    const userProfile = await Profile.findOne({ User_id: user_id });
    const { User_name, Full_name } = userProfile;

    // Upload each file to DigitalOcean Spaces
    const mediaData = await Promise.all(req.files.map(async (file) => {
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `admin-posts/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: "public-read", // Set the ACL to public-read
      };
      await s3.upload(params).promise();
      return { post: `https://rown-bucket.s3.amazonaws.com/admin-posts/${file.originalname}` };
    }));

    // Add current date to each media object
    const mediaWithDate = mediaData.map((mediaObj) => {
      return { ...mediaObj, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") };
    });

    const post = new adminpost({
      caption: req.body.caption,
      user_id: user_id,
      User_name: User_name,
      Full_name: Full_name,
      bookingengineLink: req.body.bookingengineLink,
      date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss"),
      post_type: req.body.post_type,
      Event_name: req.body.Event_name,
      media: mediaWithDate,
      adminpostId: req.body.adminpostId,
    });

    // Save the post to the database
    await post.save();

    const users = await FeedCache.find({});

    // Add post_id to the feed cache of connected users
    for (let i = 0; i < users.length; i++) {
      const feedData = await FeedCache.findOne({ user_id: users[i].user_id });
      if (feedData) {
        feedData.posts.unshift({ adminPostId: post.adminpostId });
        await feedData.save();
      }
    }
    res.status(200).json({ message: 'admin post created and added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
