const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const Hotel = require('../../models/Hotels');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const multerS3 = require('multer-s3');

const uploadHotelFiles = async (req, res, next) => {
  upload.fields([
    { name: 'hotelCoverpic', maxCount: 1 },
    { name: 'hotelLogo', maxCount: 1 },
    { name: 'galleryImages1', maxCount: 1 },
    { name: 'galleryImages2', maxCount: 1 },
    { name: 'galleryImages3', maxCount: 1 }
  ])(req, res, async (err) => {
    try {
      const hotel = await Hotel.findOne({ hotel_id: req.params.hotel_id });

      if (!hotel) {
        return res.status(404).send({ message: 'Hotel not found' });
      }

      const filter = { hotel_id: hotel.hotel_id };
      const update = {};

      // Initialize gallery array
      update.gallery = [];

      // Upload hotelLogo to DigitalOcean Spaces
      if (req.files['hotelLogo']) {
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `Hotels-image/${file.originalname}`);
            },
          }),
        });
        const hotelLogo = req.files['hotelLogo'][0];
        const hotelLogoParams = {
          Bucket: 'rown-bucket',
          Key: `Hotels-image/${hotelLogo.originalname}`,
          Body: hotelLogo.buffer,
          ContentType: hotelLogo.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(hotelLogoParams).promise();
        update.hotelLogoUrl = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${hotelLogo.originalname}`;
      }

      // Upload hotelCoverpic to DigitalOcean Spaces
      if (req.files['hotelCoverpic']) {
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `Hotels-image/${file.originalname}`);
            },
          }),
        });
        const hotelCoverpic = req.files['hotelCoverpic'][0];
        const hotelCoverpicParams = {
          Bucket: 'rown-bucket',
          Key: `Hotels-image/${hotelCoverpic.originalname}`,
          Body: hotelCoverpic.buffer,
          ContentType: hotelCoverpic.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(hotelCoverpicParams).promise();
        update.hotelCoverpicUrl = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${hotelCoverpic.originalname}`;
      }

      // Upload galleryImages1 to DigitalOcean Spaces
      if (req.files['galleryImages1']) {
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `Hotels-image/${file.originalname}`);
            },
          }),
        });
        const galleryImage1 = req.files['galleryImages1'][0];
        const galleryImage1Params = {
          Bucket: 'rown-bucket',
          Key: `Hotels-image/${galleryImage1.originalname}`,
          Body: galleryImage1.buffer,
          ContentType: galleryImage1.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(galleryImage1Params).promise();
        update.gallery[0] = {
          Image1: `https://rown-bucket.s3.amazonaws.com/Hotels-image/${galleryImage1.originalname}`
        };
      } else if (!update.gallery[0]?.Image1 && hotel.gallery[0]?.Image1) {
        update.gallery[0] = {
          Image1: hotel.gallery[0].Image1
        };
      }


      // Upload galleryImages2 to DigitalOcean Spaces
      if (req.files['galleryImages2']) {
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `Hotels-image/${file.originalname}`);
            },
          }),
        });
        const galleryImage2 = req.files['galleryImages2'][0];
        const galleryImage2Params = {
          Bucket: 'rown-bucket',
          Key: `Hotels-image/${galleryImage2.originalname}`,
          Body: galleryImage2.buffer,
          ContentType: galleryImage2.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(galleryImage2Params).promise();
        if (!update.gallery[0]) {
          update.gallery[0] = {};
        }
        update.gallery[0].Image2 = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${galleryImage2.originalname}`;
      } else if (!update.gallery[0]?.Image2 && hotel.gallery[0]?.Image2) {
        if (!update.gallery[0]) {
          update.gallery[0] = {};
        }
        update.gallery[0].Image2 = hotel.gallery[0].Image2;
      }

      // Upload galleryImages3 to DigitalOcean Spaces
      if (req.files['galleryImages3']) {
        const upload = multer({
          storage: multerS3({
            s3,
            bucket: 'rown-bucket', // Replace with your S3 bucket name
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
              cb(null, `Hotels-image/${file.originalname}`);
            },
          }),
        });
        const galleryImage3 = req.files['galleryImages3'][0];
        const galleryImage3Params = {
          Bucket: 'rown-bucket',
          Key: `Hotels-image/${galleryImage3.originalname}`,
          Body: galleryImage3.buffer,
          ContentType: galleryImage3.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(galleryImage3Params).promise();
        if (!update.gallery[0]) {
          update.gallery[0] = {};
        }
        update.gallery[0].Image3 = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${galleryImage3.originalname}`;
      } else if (!update.gallery[0]?.Image3 && hotel.gallery[0]?.Image3) {
        if (!update.gallery[0]) {
          update.gallery[0] = {};
        }
        update.gallery[0].Image3 = hotel.gallery[0].Image3;
      }

      // Update the fields if they are provided in the request body
      if (req.body.hotelName) {
        update.hotelName = req.body.hotelName;
      }
      if (req.body.display_status) {
        update.display_status = req.body.display_status;
      }
      if (req.body.hotelAddress) {
        update.hotelAddress = req.body.hotelAddress;
      }
      if (req.body.Hoteldescription) {
        update.Hoteldescription = req.body.Hoteldescription;
      }
      if (req.body.hotelRating) {
        update.hotelRating = req.body.hotelRating;

      } if (req.body.bookingengineLink) {
        update.bookingengineLink = req.body.bookingengineLink;
      }


      // Get the user_id from the found hotel
      const user_id = hotel.user_id;

      // Update the hotelLogoUrl field in all hotel records with the same user_id
      await Hotel.updateMany({ user_id }, { $set: { hotelLogoUrl: update.hotelLogoUrl } });

      const options = { new: true };
      const updatedProfile = await Hotel.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'Hotel data updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong' });
    }
  })
}






module.exports = uploadHotelFiles;