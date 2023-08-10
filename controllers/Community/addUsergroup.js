
const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const group =require('../../models/userGroup')
const Profile =require('../../models/Profile')
const multerS3 = require('multer-s3');
// Configure multer to handle file uploads
const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });
const moment = require('moment-timezone')
  


// Configure multer to handle file uploads
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

// Define API endpoint for posting photos/videos
module.exports =  async (req, res) => {
  try {
    let mediaUrl;

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
    const userProfile = await Profile.findOne({ User_id: req.body.creatorID});
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }
    const{Full_name,Profile_pic,verificationStatus,location,User_id,Role,Mesibo_account}=userProfile
    const mesibouid =Mesibo_account[0].uid;
    const mesiboaddress =Mesibo_account[0].address;
   const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")

    // Create a new post object with the uploaded media URL or undefined
    const post = new group({
      group_name: req.body.group_name,
      group_id: req.body.group_id,
      location:req.body.location,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
      verificationStatus:verificationStatus,
      community_type: req.body.community_type,
      creatorID: req.body.creatorID,
      description:req.body.description,
      date_added: date_added,
      creator_name:Full_name,
      Profile_pic: mediaUrl
    });
    const newAdmin = {user_id:User_id,Full_name:Full_name,address:mesiboaddress,uid:mesibouid,Profile_pic:Profile_pic,verificationStatus:verificationStatus,location:location,Role:Role};
    //console.log(newAdmin)
    post.Admin.push(newAdmin);
  
    // Save the post to the database
      await post.save();
      res.status(201).send({message:"user group created successfully"})
    
    
  
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'something wrong'});
  }
};

