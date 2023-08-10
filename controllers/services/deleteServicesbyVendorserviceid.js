// const service = require('../../models/service');
// const profile = require('../../models/Profile');

// module.exports = async (req, res) => {
//     try {
//         const vendorServiceId = req.params.vendorServiceId;
        
//         // Delete the service based on vendorServiceId
//         const result = await service.deleteOne({ vendorServiceId });

//         if (result.deletedCount === 1) {
//             return res.status(200).json({ message: 'Service deleted successfully' });
//         } else {
//             return res.status(404).json({ message: 'Service not found' });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };


const service = require('../../models/service');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const vendorServiceId = req.params.vendorServiceId;

    // Find the profile document that contains the vendorServiceId in vendorServices array
    const profile = await Profile.findOne({ 'vendorInfo.vendorServices.vendorServiceId': vendorServiceId });
    const services = await service.findOne({ vendorServiceId: vendorServiceId });
    if (profile && services) {
      // Remove the object from vendorServices array that matches the vendorServiceId
      profile.vendorInfo.vendorServices = profile.vendorInfo.vendorServices.filter(service => service.vendorServiceId !== vendorServiceId);
      await service.deleteOne({vendorServiceId: vendorServiceId});
      // Save the updated profile
      await profile.save();

      return res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
