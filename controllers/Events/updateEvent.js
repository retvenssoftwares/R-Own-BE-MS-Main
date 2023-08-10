

const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const event = require('../../models/events');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports =  async (req, res) => { {
    try {

      let mediaUrl

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {

      const params = {
        Bucket: 'rown-space-bucket/Event-img',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-space-bucket.nyc3.digitaloceanspaces.com/Event-img/${req.file.originalname}`;
    }


      const filter = { event_id: req.params.event_id };
      const update = {
        user_id: req.body.user_id,
        location: req.body.location,
        venue: req.body.venue,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        event_title: req.body.event_title,
        event_description: req.body.event_description,
        event_category: req.body.event_category,
        email: req.body.email,
        phone: req.body.phone,
        website_link: req.body.website_link,
        booking_link: req.body.booking_link,
        price: req.body.price,
        event_start_date: req.body.event_start_date,
        event_start_time: req.body.event_start_time,
        event_end_date: req.body.event_end_date,
        event_end_time: req.body.event_end_time,
        registration_start_date: req.body.registration_start_date,
        registration_start_time: req.body.registration_start_time,
        registration_end_date: req.body.registration_end_date,
        registration_end_time: req.body.registration_end_time,
        event_thumbnail: mediaUrl
      
};
      const options = { new: true };
      const updatedProfile = await event.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'Event updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };


};



