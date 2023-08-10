const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const eventcategory  = require("../../models/eventCategory");

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
// Define API endpoint for posting photos/videos
module.exports =  async (req, res) => {
  try {
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
  
    // Create a new post object with the uploaded media URL or undefined
    const post = new eventcategory({
      category_name: req.body.category_name,
       Image: mediaUrl
    });
    
    // Save the post to the database
      await post.save();
      res.status(201).send({message:"Event category added successfully"})
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'something wrong'});
  }
};