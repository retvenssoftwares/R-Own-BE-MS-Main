// models path
const service =require('../../models/service')
const profile = require('../../models/Profile');
const serviceName = require('../../models/brandservices')
const shortid = require('shortid');
module.exports=async (req, res) => {
    try{
      const user_id = req.body.user_id;
      const serviceId = req.body.serviceId;
      const vendorServiceId = shortid.generate();
      const userProfile = await profile.findOne({ User_id: user_id });
    if (!userProfile) {
      return res.status(404).json({ message: "user profile not found" });
    }
    const { Profile_pic, User_name, vendorInfo, location,verificationStatus } = userProfile;

    const services = await serviceName.findOne({ serviceId: serviceId });
    if (!services) {
      return res.status(404).json({ message: "not found" });
    }
    const { service_name } = services;

        
        const vendorData = new service({
          serviceId: serviceId,
            user_id: user_id,
            Profile_pic: Profile_pic,
            vendorName: vendorInfo.vendorName,
            vendorImage: vendorInfo.vendorImage,
            location: location,
            User_name: User_name,
            verificationStatus:verificationStatus,
            service_name: service_name,
            vendorServiceId:vendorServiceId
          });
         
          await vendorData.save();
           // Push serviceId into vendorServices array of vendorInfo in the Profile model
    userProfile.vendorInfo.vendorServices.push({ serviceId: serviceId, vendorServiceId:vendorServiceId, service_name: service_name });
    await userProfile.save();
          res.json({message: "service added successfully"});
      
    }catch (error) {
        console.error(error);
        res.status(500).send({message: 'Server error'});
      }
};