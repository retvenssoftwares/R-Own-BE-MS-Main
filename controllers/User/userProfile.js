
const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const multerS3 = require('multer-s3');
const Profile = require("../../models/Profile");
const blockedUser = require("../../models/blockedUser");
const blockedByUser = require("../../models/blockedByUser");
const save = require("../../models/saved");
//const multerS3 = require('multer-s3')
const { S3Client } = require("@aws-sdk/client-s3");
const feed = require("../../models/feedcache");
const admin = require("../../models/adminPost");
const notificationcache = require('../../models/notificationSchema')
const notify = require('../../models/notification');
const moment = require('moment-timezone')


// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `profile-pictures/${file.originalname}`);
    },
  }),
});
// Define API endpoint for posting photos/videos
module.exports = async (req, res) => {
  try {
    let mediaUrl

    // Upload the file to Amazon s3 Spaces if a file has been selected
    if (req.file) {
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `profile-pictures/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/profile-pictures/${req.file.originalname}`;
    }


    // Check if user with the same phone number already exists
    const existingUser = await Profile.findOne({ Phone: req.body.Phone });
    if (existingUser) {
      // Update the device token if it has changed
      if (req.body.device_token && req.body.device_token !== existingUser.device_token) {
        existingUser.device_token = req.body.device_token;
        await existingUser.save();
      }
      res.status(200).send({ message: "User already exists", user_id: existingUser.User_id });
    } else {
      // Create a new post object with the uploaded media URL or undefined
      const post = new Profile({
        Full_name: req.body.Full_name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Mesibo_account: req.body.Mesibo_account,
        Interest: req.body.Interest,
        DOB: req.body.DOB,
        User_name: req.body.User_name,
        location: req.body.location,
        Role: req.body.Role,
        studentEducation: req.body.studentEducation,
        normalUserInfo: req.body.normalUserInfo,
        hospitalityExpertInfo: req.body.hospitalityExpertInfo,
        hotelOwnerInfo: req.body.hotelOwnerInfo,
        vendorInfo: req.body.vendorInfo,
        Post_count: req.body.Post_count,
        saved_post: req.body.saved_post,
        Liked_post: req.body.Liked_post,
        Created_On: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss"),
        connection_count: req.body.connection_count,
        Profile_pic: mediaUrl,
        device_token: req.body.device_token // Set the device token
      });

      // Save the post to the database
      await post.save();

      //
      const Saved = new save({

        user_id: post.User_id
      })
      await Saved.save();


      //feed cache
      const Feed = new feed({
        user_id: post.User_id,
        date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
      });
      await Feed.save();

      // Fetch all admin posts with adminStatus set to true
      const adminPosts = await admin.find({ adminStatus: "true" }, "adminpostId").limit(4);

      // Extract adminpostId values from the admin posts
      const adminPostIds = adminPosts.map((post) => post.adminpostId);

      const userFile = await feed.findOne({ user_id: post.User_id });
      if (userFile) {
        userFile.posts.push(...adminPostIds.map((adminPostId) => ({ adminPostId })));
        await userFile.save();
      }



      //notificationcache
      const notification = new notificationcache({
        user_id: post.User_id
      });
      await notification.save();

      //notification
      const notifications = new notify({
        user_id: post.User_id
      });
      await notifications.save();

      //blockeduser
      const blocked = new blockedUser({
        User_id: post.User_id
      });
      await blocked.save();

      //blockedByuser
      const blockedByuser = new blockedByUser({
        User_id: post.User_id
      });
      await blockedByuser.save();


      res.status(201).send({ message: "User created successfully", user_id: post.User_id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
