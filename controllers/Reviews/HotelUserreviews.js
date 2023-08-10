const profile = require('../../models/Profile');
const hotel = require('../../models/Hotels');
const reviews = require('../../models/HotelreviewsOfUser');
const quickreviews = require('../../models/HotelreviewType');
const moment = require('moment-timezone')
module.exports = async (req, res) => {
  try {
    const hotel_id = req.params.hotel_id;

    const hotelreview = await reviews.findOne({ hotel_id });

    if (!hotelreview) {
      return res.status(404).json({ message: "Please complete your profile" });
    }

    const { user_id, Rating_number, Description, reviewsId } = req.body;

    const profiledata = await profile.findOne({ User_id: user_id });

    if (!profiledata) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const { Profile_pic, Full_name, verificationStatus, Mesibo_account } = profiledata;

    const date_added =  moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    
    const review = {
      reviewsId,
      Full_name: Full_name,
      Profile_pic: Profile_pic,
      User_id: user_id,
      verificationStatus:verificationStatus,
      Rating_number,
      Description,
      Mesibo_account: Mesibo_account[0],
      date_added
    };

    hotelreview.reviews_types.push(review);

    await hotelreview.save();

    const Quick = await quickreviews.find({ reviews_id: { $in: reviewsId.map(id => id.reviews_id) } });

    for (let i = 0; i < Quick.length; i++) {
      const quickReview = Quick[i];
      const reviewCount = quickReview.review_count;

      const existingReview = reviewCount.find(review => review.hotel_id === hotel_id);

      if (existingReview) {
        existingReview.numberOfUser.push({ User_id: user_id });
      } else {
        reviewCount.push({
          hotel_id: hotel_id,
          numberOfUser: [{ User_id: user_id }]
        });
      }

      await quickReview.save();
    }

    res.status(200).json({ message: "User successfully reviewed the hotel" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
