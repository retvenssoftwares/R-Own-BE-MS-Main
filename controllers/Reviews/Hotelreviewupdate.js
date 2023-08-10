const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const review = require('../../models/HotelreviewType');
const multerS3 = require('multer-s3');

// Configure multer to handle file uploads
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    // acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `hotel-review-img/${file.originalname}`);
    },
  }),
});

module.exports =  async (req, res) => { {
    try {
      let mediaUrl
    // Upload the file to amazon s3 Spaces if a file has been selected
    if (req.file) {
      const params = {
        Bucket: 'rown-bucket', //  your S3 bucket name
        Key: `hotel-review-img/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/hotel-review-img/${req.file.originalname}`;
    }


      const filter = { reviews_id: req.params.reviews_id };
      const Review = {
        reviews_name: req.body.reviews_name,
        quickreview_pic: mediaUrl,
        display_status:req.body.display_status
};
      const options = { new: true };

      const updatedProfile = await review.findOneAndUpdate(filter, Review, options);
      res.status(200).send({ message: 'Quick review updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };

};