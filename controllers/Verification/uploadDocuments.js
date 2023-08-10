const AWS = require('aws-sdk');
const s3 = require('../../utils/url');
const multerS3 = require('multer-s3')
const feed = require("../../models/verification");
const moment = require('moment-timezone');
const multer = require('multer')

// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `verification-documents/${file.originalname}`);
    },
    // acl: 'public-read', // Set the ACL to public-read
  }),
});


module.exports = async (req, res) => {
  try {
    // Upload each file to DigitalOcean Spaces
    const mediaData = await Promise.all(req.files.map(async (file) => {
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `verification-documents/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: "public-read", // Set the ACL to public-read
      };
      await s3.upload(params).promise();
      return { document: `https://rown-bucket.s3.amazonaws.com/verification-documents/${file.originalname}` };
    }));

    // Add current date to each media object
    const mediaWithDate = mediaData.map((mediaObj) => {
      return { ...mediaObj, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") };
    });          

    // Create a new post object with the uploaded media URLs and dates
    const existingUser = await feed.findOne({ user_id: req.body.user_id });
    if (existingUser) {
        res.status(200).send({ message: "You have already applied for verification"});
      }
      else{
        const document = new feed({
            user_id: req.body.user_id,      
            CountryorRegion: req.body.CountryorRegion,
            Documents: mediaWithDate,
            Category: req.body.Category,
            User_name: req.body.User_name,
            Full_name: req.body.Full_name,
            date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
          });
      
          // Save the post to the database
          await document.save();       
          
      
          res.status(200).json({ message: 'You have successfully applied for verification' });
      }
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
