const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const hotels = require("../../models/Hotels");
const service = require("../../models/service");
module.exports = async (req, res) => {
  try {
    const hotelOwnerCount = await Profile.countDocuments({ Role: "Hotel Owner" });
    const normalUserCount = await Profile.countDocuments({ Role: "Normal User" });
    const vendorCount = await Profile.countDocuments({ Role: "Business Vendor / Freelancer" });
    const hotelierCount = await Profile.countDocuments({ Role: "Hospitality Expert" });
    const PostCount = await Post.countDocuments({});
    const hotelCount = await hotels.countDocuments({});
    const serviceCount = await service.countDocuments({});
    res.json({
        hotelOwnerCount,
        normalUserCount,
        vendorCount,
        hotelierCount,
        PostCount,
        hotelCount,
        serviceCount,
      });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
