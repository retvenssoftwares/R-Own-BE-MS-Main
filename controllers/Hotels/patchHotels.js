// Define API endpoint for liking a post
const profile = require('../../models/Profile');

module.exports = async (req, res) => {
  const user_id = req.params.User_id;
  const { hotel_id } = req.body;

  try {
    const post = await profile.find({ User_id: user_id });
    if (post.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = { hotel_id };
    post[0].hotelOwnerInfo.hotelInfo.push(newComment);
    await post[0].save();

    return res.json({ message: "hotel_id added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  