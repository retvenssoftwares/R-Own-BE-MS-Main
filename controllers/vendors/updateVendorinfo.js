


const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const multerS3 = require('multer-s3')
const Profile = require('../../models/Profile');
const reviews = require('../../models/userReviewsdetails');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const uploadHotelFiles = async (req, res, next) => {
  upload.fields([
    { name: 'Vendorimg', maxCount: 1 },
    { name: 'portfolioImages1', maxCount: 1 },
    { name: 'portfolioImages2', maxCount: 1 },
    { name: 'portfolioImages3', maxCount: 1 }
  ])(req, res, async (err) => {
    try {
      // Handle error if multer middleware encounters an error
      if (err) {
        throw new Error(err.message);
      }

      // Retrieve User_id from req.params
      const User_id = req.params.User_id;

      // Find the profile with the specified User_id
      const profile = await Profile.findOne({ User_id });

      // Update vendor information fields in the profile
      profile.vendorInfo.vendorName = req.body.vendorName || profile.vendorInfo.vendorName;
      profile.vendorInfo.vendorDescription = req.body.vendorDescription || profile.vendorInfo.vendorDescription;
      profile.vendorInfo.websiteLink = req.body.websiteLink || profile.vendorInfo.websiteLink;

      // Ensure that portfolioLink array contains an object
      if (profile.vendorInfo.portfolioLink.length === 0) {
        profile.vendorInfo.portfolioLink.push({});
      }

      // Upload and update Vendorimg
      if (req.files['Vendorimg']) {

        // Configure multer to handle file uploads
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            // acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `vendor-images/${file.originalname}`);
            },
          }),
        });

        const vendorImage = req.files['Vendorimg'][0];
        const vendorImageParams = {
          Bucket: 'rown-bucket', // Update with your desired bucket name
          Key: `vendor-images/${vendorImage.originalname}`,
          Body: vendorImage.buffer,
          ContentType: vendorImage.mimetype,
          acl: 'public-read'
        };
        await s3.upload(vendorImageParams).promise();
        profile.vendorInfo.vendorImage = `https://rown-bucket.s3.amazonaws.com/vendor-images/${vendorImage.originalname}`;
      }

      // Upload and update portfolioImages1
      if (req.files['portfolioImages1']) {
        // Configure multer to handle file uploads
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            // acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `vendor-images/portfolio-images/${file.originalname}`);
            },
          }),
        });

        const portfolioImage1 = req.files['portfolioImages1'][0];
        const portfolioImage1Params = {
          Bucket: 'rown-bucket', // Update with your desired bucket name
          Key: `vendor-images/portfolio-images/${portfolioImage1.originalname}`,
          Body: portfolioImage1.buffer,
          ContentType: portfolioImage1.mimetype,
          acl: 'public-read'
        };
        await s3.upload(portfolioImage1Params).promise();
        profile.vendorInfo.portfolioLink[0].Image1 = `https://rown-bucket.s3.amazonaws.com/vendor-images/portfolio-images/${portfolioImage1.originalname}`;
      }

      // Upload and update portfolioImages2
      if (req.files['portfolioImages2']) {
        // Configure multer to handle file uploads
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            // acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `vendor-images/portfolio-images/${file.originalname}`);
            },
          }),
        });

        const portfolioImage2 = req.files['portfolioImages2'][0];
        const portfolioImage2Params = {
          Bucket: 'rown-bucket', // Update with your desired bucket name
          Key: `vendor-images/portfolio-images/${portfolioImage2.originalname}`,
          Body: portfolioImage2.buffer,
          ContentType: portfolioImage2.mimetype,
          acl: 'public-read'
        };
        await s3.upload(portfolioImage2Params).promise();
        profile.vendorInfo.portfolioLink[0].Image2 = `https://rown-bucket.s3.amazonaws.com/vendor-images/portfolio-images/${portfolioImage2.originalname}`;
      }

      // Upload and update portfolioImages3
      if (req.files['portfolioImages3']) {
        // Configure multer to handle file uploads
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            // acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `vendor-images/portfolio-images/${file.originalname}`);
            },
          }),
        });

        const portfolioImage3 = req.files['portfolioImages3'][0];
        const portfolioImage3Params = {
          Bucket: 'rown-bucket', // Update with your desired bucket name
          Key: `vendor-images/portfolio-images/${portfolioImage3.originalname}`,
          Body: portfolioImage3.buffer,
          ContentType: portfolioImage3.mimetype,
          acl: 'public-read'
        };
        await s3.upload(portfolioImage3Params).promise();
        profile.vendorInfo.portfolioLink[0].Image3 = `https://rown-bucket.s3.amazonaws.com/vendor-images/portfolio-images/${portfolioImage3.originalname}`;
      }

      // Save the updated profile
      await profile.save();

      // Check if a review document exists for the user
      const existingReview = await reviews.findOne({ User_id });
      if (!existingReview) {
        const newReview = new reviews({
          User_id
        });
        await newReview.save();
      }

      res.status(200).send({ message: 'Vendor info updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  });
};

module.exports = uploadHotelFiles;

