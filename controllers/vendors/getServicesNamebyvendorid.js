const ServiceName = require("../../models/vendor");

module.exports = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const serviceName = await ServiceName.findOne({ user_id: userId }).select("vendorServiceName");
    console.log(serviceName)

    if (serviceName) {
      res.send(serviceName);
    } else {
      res.json({ message: "No match found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
