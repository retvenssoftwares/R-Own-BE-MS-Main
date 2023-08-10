//models
const vendor  = require("../../models/vendor");

module.exports= async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const {Name,Price} = req.body;
   
    // Find the vendor using the vendor_id
    const Vendor = await vendor.findOne({ user_id:user_id });
    if (!Vendor) {
      return res.status(404).json({ message: 'vendor not found' });
    }
    // Add the new service to the vendorServiceName array
    const newservice = {Name,Price};
    Vendor.vendorServiceName.push(newservice)

    // Update the service in the database
    await 
    Vendor.save();

    return res.status(200).json({ message: 'vendorservice saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};