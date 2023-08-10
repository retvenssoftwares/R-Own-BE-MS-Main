//models path
const review = require('../../models/userReviewsdetails');

module.exports = async (req, res) => {
  try {
    const userId = req.params.User_id;
    const vendor = await review.findOne({ User_id: userId }).select("userReviews");

    if (vendor) {
      res.send([vendor]);
    } else {
      res.json({ message: "vendor not  found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
