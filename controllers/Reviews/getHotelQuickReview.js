//models path
const hotelreview = require('../../models/HotelreviewType')

 module.exports=async (req, res) => {
  try {
    const quickreview = await hotelreview.find({}, { reviews_name: 1,quickreview_pic:1,reviews_id:1 }).lean().exec(); 
    // Fetch all quick review  names
    res.status(200).json(quickreview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};