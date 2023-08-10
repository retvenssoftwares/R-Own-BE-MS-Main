const hotelsviaLocation = require("../../models/Hotels");

module.exports= async (req, res) => {
  try {
    const location = req.params.location;
    const hotelOwnerInfo = await hotelsviaLocation.find({hotelAddress:location}, 'hotelName location hotel_id hotelLogoUrl')
    if (hotelOwnerInfo) {
      res.send(hotelOwnerInfo);
    } else {
      res.json({message: "No match found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
