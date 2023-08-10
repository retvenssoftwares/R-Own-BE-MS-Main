const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const Profile = require('../../models/Profile');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadHotelFiles = async (req, res, next) => {
  upload.fields([
    { name: 'resumeurl', maxCount: 1 },
    { name: 'Profile_pic', maxCount: 1 } // Adjust the maxCount value as per your requirement
  ])(req, res, async (err) => {
    try {
      let resume;
      if (req.files['resumeurl']) {
        const resumeurl = req.files['resumeurl'][0];
        const resumeurlParams = {
          Bucket: 'rown-space-bucket/Resume',
          Key: resumeurl.originalname,
          Body: resumeurl.buffer,
          ContentType: resumeurl.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(resumeurlParams).promise();
        resume = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/Resume/${resumeurl.originalname}`;
      }

      let Profile_pic_url;
      if (req.files['Profile_pic']) {
        const Profile_pic = req.files['Profile_pic'][0];
        const Profile_picParams = {
          Bucket: 'rown-space-bucket/profile-pictures',
          Key: Profile_pic.originalname,
          Body: Profile_pic.buffer,
          ContentType: Profile_pic.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(Profile_picParams).promise();
        Profile_pic_url = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/profile-pictures/${Profile_pic.originalname}`;
      }

      const filter = { User_id: req.params.User_id };

      const update = {
        $set: {
          User_name: req.body.User_name,
          userBio: req.body.userBio,
          Gender: req.body.Gender,
          resume: resume,
          Profile_pic: Profile_pic_url,
          'normalUserInfo.$[elem].jobTitle': req.body.jobTitle // Update the jobTitle field for all matched array elements
        }
      };

      const options = {
        new: true,
        arrayFilters: [{ 'elem.jobTitle': { $exists: true } }] // Only update elements with the jobTitle field
      };

      const updatedProfile = await Profile.findOneAndUpdate(filter, update, options);

      res.send({ message: 'Resume info updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong' });
    }
  });
};

module.exports = uploadHotelFiles;