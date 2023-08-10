
const profile = require('../../models/Profile');
// const services = require('../../models/brandservices');
const reviews = require('../../models/userReviewsdetails');
const quickreviews = require('../../models/reviewsTypes');
const moment = require('moment-timezone')
module.exports = async (req, res) => {
  try {
    const User_id = req.params.User_id;
    const { reviewsId, user_id, Rating_number, Description } = req.body;

    const vendorreview = await reviews.findOne({ User_id });
    if (!vendorreview) {
      return res.status(404).json({ message: "Please complete your profile" });
    }

    const profiledata = await profile.findOne({ User_id: user_id });
    if (!profiledata) {
      return res.status(404).json({ message: "User profile not found" });
    }

    const { Profile_pic,verificationStatus, Full_name } = profiledata;
    const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    const review = {
      reviewsId,
      Full_name: Full_name,
      Profile_pic: Profile_pic,
      verificationStatus:verificationStatus,
      user_id: user_id,
      Rating_number,
      Description,
      date_added
    };

    vendorreview.userReviews.push(review);
    await vendorreview.save();

    const Quick = await quickreviews.find({ reviews_id: { $in: reviewsId.map(id => id.reviews_id) } });

    for (let i = 0; i < Quick.length; i++) {
      const quickReview = Quick[i];
      const reviewCount = quickReview.review_count;

      const existingReview = reviewCount.find(review => review.User_id === User_id);

      if (existingReview) {
        existingReview.numberOfUser.push({ user_id: user_id });
      } else {
        reviewCount.push({
          User_id: User_id,
          numberOfUser: [{ user_id: user_id }]
        });
      }

      await quickReview.save();
    }


    res.status(200).json({ message: "User successfully reviewed the vendor" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
