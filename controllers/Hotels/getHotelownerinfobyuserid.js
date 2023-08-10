const Profile = require("../../models/Profile");
const hotel =require("../../models/Hotels")

module.exports= async (req, res) => {
  try {
    const userId = req.params.User_id;
    const Hotel =await hotel.findOne({user_id:userId})
    const {hotel_id,hotelLogoUrl}=Hotel
   
    const hotelOwnerInfo = await Profile.find({ User_id: userId }).select('hotelOwnerInfo');
    if (hotelOwnerInfo) {
      res.json({hotelOwnerInfo,hotel_id,hotelLogoUrl});
    } else {
      res.json({message: "No match found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
