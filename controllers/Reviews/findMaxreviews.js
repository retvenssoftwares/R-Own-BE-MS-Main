const Hotelreview = require('../../models/HotelreviewType');

module.exports = async (req, res) => {
  try {
    const hotel_id = req.params.hotel_id;
    const reviewsData = await Hotelreview
      .find({ 'review_count.hotel_id': hotel_id })
      .select('quickreview_pic reviews_name reviews_id review_count')
      .exec();

    if (reviewsData.length === 0) {
      return res.status(404).json({ error: 'Reviews not found' });
    }

    const sortedReviews = reviewsData.sort((a, b) => b.review_count[0].numberOfUser.length - a.review_count[0].numberOfUser.length);
    const topThreeReviews = sortedReviews.slice(0, 3);

    const reviewsWithCount = topThreeReviews.map(review => ({
      ...review._doc,
      review_count: {
        count: review.review_count[0].numberOfUser.length
      }
    }));

    res.json(reviewsWithCount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


