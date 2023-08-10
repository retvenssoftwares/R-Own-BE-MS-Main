const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const event  = require("../../models/events");
const Profile  = require("../../models/Profile");
const eventcategory  = require("../../models/eventCategory");
const moment = require('moment-timezone')
// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
// Define API endpoint for posting photos/videos
module.exports =  async (req, res) => {
  try {
    const category_id=req.body.category_id;
    let mediaUrl;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {
      const params = {
        Bucket: 'rown-space-bucket/Event-img',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/Event-img/${req.file.originalname}`;
    }
    
    const User_id = req.body.User_id;
    const userProfile = await Profile.findOne({ User_id: User_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }
    const { Profile_pic, User_name,Full_name, verificationStatus } = userProfile;

    const categorys = await eventcategory.findOne({ category_id:category_id  });
    if (!categorys) {
      return res.status(404).json({ message: "category not found" });
    }
    const { category_name } = categorys;
    const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    // Create a new post object with the uploaded media URL or undefined
    const post = new event({
        category_id:category_id,
        User_id:User_id,
        location: req.body.location,
        venue: req.body.venue,
        country: req.body.country,
        state: req.body.state,
        city: req.body.category_name,
        event_title: req.body.event_title,
        event_description: req.body.event_description,
        event_category: req.body.event_category,
        email: req.body.email,
        phone: req.body.phone,
        website_link: req.body.website_link,
        booking_link: req.body.booking_link,
        price: req.body.price,
        event_start_date: req.body.event_start_date,
        event_start_time: req.body.event_start_time,
        event_end_date: req.body.event_end_date,
        event_end_time: req.body.event_end_time,
        registration_start_date: req.body.registration_start_date,
        registration_start_time: req.body.registration_start_time,
        registration_end_date: req.body.registration_end_date,
        registration_end_time: req.body.registration_end_time,
        date_added,
        event_thumbnail: mediaUrl,
        Profile_pic: Profile_pic,
        User_name: User_name,
        Full_name:Full_name,
        verificationStatus: verificationStatus,
        category_name:category_name
    });
    
    // Save the post to the database
      await post.save();
      res.status(201).send({message:"Event added successfully"})
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'something wrong'});
  }
};