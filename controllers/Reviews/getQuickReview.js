//models path
const review = require('../../models/reviewsTypes')

 module.exports=async (req, res) => {
  try {
    const quickreview = await review.find({}, { reviews_name: 1,quickReviewImage:1,reviews_id:1}).lean().exec(); 
    // Fetch all quick review  names
    res.status(200).json(quickreview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};