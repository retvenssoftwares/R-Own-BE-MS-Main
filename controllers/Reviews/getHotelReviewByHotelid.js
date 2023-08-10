//models path
const review = require('../../models/HotelreviewsOfUser');

module.exports = async (req, res) => {
  try {
    const hotelId = req.params.hotel_id;
    const hotel = await review.findOne({ hotel_id: hotelId }).select("reviews_types");

    if (hotel) {
      res.send([hotel]);
    } else {
      res.json({ message: "hotel not  found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};