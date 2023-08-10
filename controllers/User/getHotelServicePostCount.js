const Post = require("../../models/Post");
const hotels = require("../../models/Hotels");
const service = require("../../models/service");

module.exports = async (req, res) => {
  try {
    const PostCount = await Post.countDocuments({});
    const hotelCount = await hotels.countDocuments({});
    const serviceCount = await service.countDocuments({});
   
    res.json({
        PostCount,
        hotelCount,
        serviceCount,
      });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
