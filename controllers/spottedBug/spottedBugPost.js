const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const bug = require('../../models/spottedBug');
const moment = require('moment-timezone');
const multerS3 = require('multer-s3');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadHotelFiles = upload.fields([
  { name: 'bugimg', maxCount: 2 }
]);

const addSpottedBug = async (req, res, next) => {
  try {
    const { description_bug } = req.body;


    const images = [];

    
    if (req.files && req.files['bugimg']) {
      const upload = multer({
        storage: multerS3({
          s3,
          bucket: 'rown-bucket', // Replace with your S3 bucket name
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: (req, file, cb) => {
            cb(null, `spottedbug-img/${file.originalname}`);
          },
        }),
      });
      const bugimg = req.files['bugimg'];
      for (const image of bugimg) {
        const imageParams = {
          Bucket: 'rown-bucket',
          Key: `spottedbug-img/${image.originalname}`,
          Body: image.buffer, // Use image.buffer as the Body parameter
          ContentType: image.mimetype,
          ACL: 'public-read'
        };
        await s3.upload(imageParams).promise();
        const imageUrl = `https://rown-bucket.s3.amazonaws.com/spottedbug-img/${image.originalname}`;
        images.push({ img: imageUrl });
      }
    }

    const Date = moment().tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
    const spotted = new bug({
      Date: Date,
      description_bug,
      images,
    });

    await spotted.save();
    res.json({ message: 'spotted bug added successfully ' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error' });
  }
};

module.exports = { addSpottedBug, uploadHotelFiles };
