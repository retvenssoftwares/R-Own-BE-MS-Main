const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../utils/url');
const blogcategory  = require("../../models/blogCategories");

// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', //  bucket name
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `blog-categories/${file.originalname}`);
    },
  }),
});

  
// Define API endpoint for posting photos/videos
module.exports =  async (req, res) => {
  try {
    let mediaUrl;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {
      
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `blog-categories/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/blog-categories/${req.file.originalname}`;
    }
  
    // Create a new post object with the uploaded media URL or undefined
    const post = new blogcategory({
      category_name: req.body.category_name,
      Image: mediaUrl
    });
    
    // Save the post to the database
      await post.save();
      res.status(201).send({message:"blog category added successfully"})
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'something wrong'});
  }
};