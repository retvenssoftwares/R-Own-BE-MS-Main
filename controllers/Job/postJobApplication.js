const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const jobApplication  = require("../../models/jobApplication");

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  
// Define API endpoint for posting photos/videos
module.exports =  async (req, res) => {
  try {
    let resumeUrl;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {
      
      const params = {
        Bucket: 'rown-space-bucket/Resume',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read'
      };
      await s3.upload(params).promise();
      resumeUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/Resume/${req.file.originalname}`;
    }
  
    // Create a new post object with the uploaded media URL or undefined
    const jobapply = new jobApplication({
        user_id: req.body.user_id,
        Full_name: req.body.Full_name,
        Experience: req.body.Experience,
        jid: req.body.jid,
        applicationId: req.body.applicationId,
        status: req.body.status,
        self_introduction:req.body.self_introduction,
        resume: resumeUrl
    });    

    // Save the post to the database
    
    
    await jobapply.save();

    res.status(201).send({message:"You have successfully applied for this job",job_id:jobapply.jid, applicationId:jobapply.applicationId})    
    
  
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'something wrong'});
  }
};