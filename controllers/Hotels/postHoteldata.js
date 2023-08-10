const shortid = require('shortid');
const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const Hotel = require('../../models/Hotels');
const profile = require("../../models/Profile")
const multerS3 = require('multer-s3');
const reviews = require('../../models/HotelreviewsOfUser')
// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const moment = require('moment-timezone')

const uploadHotelFiles = async (req, res, next) => {
  upload.fields([
    // { name: 'hotelProfilepic', maxCount: 1 },
    { name: 'hotelCoverpic', maxCount: 1 },
    { name: 'hotelLogo', maxCount: 1 }
  ])(req, res, async (err) => {
    try {
      const { hotelName, hotelAddress, hotelRating, location, user_id, Hoteldescription} = req.body

      const data = await profile.findOne({User_id:user_id})

      const bookingengineLink = data ? data.hotelOwnerInfo.bookingEngineLink: '';
  
      // Upload hotelLogo to DigitalOcean Spaces
    let hotelLogoUrl;
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
        acl: 'public-read'
      };
      await s3.upload(hotelLogoParams).promise();
      hotelLogoUrl = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${hotelLogo.originalname}`;
    }

    // Upload hotelCoverpic to DigitalOcean Spaces
    let hotelCoverpicUrl;
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
        acl: 'public-read'
      };
      await s3.upload(hotelCoverpicParams).promise();
      hotelCoverpicUrl = `https://rown-bucket.s3.amazonaws.com/Hotels-image/${hotelCoverpic.originalname}`;
    }

     const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")

    
    const hotel = new Hotel({
      hotelName,
      Hoteldescription,
      user_id,
      hotelAddress,
      hotelRating,
      hotelLogoUrl,
      bookingengineLink,
      location,
      // hotelProfilepicUrl,
      hotelCoverpicUrl,
      date_added
    });   

      await hotel.save();

      const review = new reviews({
        hotel_id:hotel.hotel_id,
        user_id:hotel.user_id
      })
      
  
      await review.save()


      res.json({ message: 'Hotel successfully added' });
     
    } catch (error) {
      console.error(error);
      res.json({ message: 'Server error' });
    }
  });
  
  
  };

  //


module.exports = uploadHotelFiles