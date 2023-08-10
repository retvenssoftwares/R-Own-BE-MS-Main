const profile = require("../../models/Profile");

module.exports = async (req, res) => {
  const user_id = req.params.User_id;
  const { vendorServiceId, serviceId } = req.body;

  try {
    const post = await profile.findOne({ User_id: user_id });
    if (!post) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = { vendorServiceId, serviceId };
    post.vendorInfo.vendorServices.push(newComment);
    await post.save();

    return res.json({ message: "vendorServiceId added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
