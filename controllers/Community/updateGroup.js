const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const group =require('../../models/userGroup')
const multerS3 = require('multer-s3');
// Configure multer to handle file uploads
const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `community_profile-pic/${file.originalname}`);
    },
  }),
});

module.exports = async (req, res) => {
  try {
    let mediaUrl = req.body.Profile_pic_url;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {
      const params = {
        Bucket: 'rown-bucket',
        Key: `community_profile-pic/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/community_profile-pic/${req.file.originalname}`;
    }

    // Update the user's profile with the new data
    const filter = { group_id: req.params.group_id };
    const update = {
        group_name: req.body.group_name,
        location:req.body.location,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        community_type: req.body.community_type,
        description:req.body.description,
        Profile_pic: mediaUrl,
      
    };
    const options = { new: true };
    
        const updatedgroup = await group.findOneAndUpdate(filter, update, options);
    
         res.status(200).send({ message: 'Group updated successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};