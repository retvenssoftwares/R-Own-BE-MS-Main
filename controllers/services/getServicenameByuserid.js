const services = require('../../models/service')
const servicename = require('../../models/brandservices')
const profile = require('../../models/Profile')

module.exports = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const vendorservice = await services.find({user_id})
        const profiles = await servicename.find({})
        const Profile = await profile.find({})

        const result = vendorservice.map(job => {
            const matchingProfile = profiles.find(profile => profile.serviceId === job.serviceId)
            const matchingprofile = Profile.find(profile => profile.User_id === job.user_id)
            if (!(matchingProfile && matchingprofile)) {
                return {
                    ...job.toObject(),
                     service_name: null,
                     User_name:null,    
                     location:null,
                     vendorImage:null, 
                     vendorName:null
                }
            } else {
                const { vendorImage, vendorName } = matchingprofile.vendorInfo;
                return {
                    ...job.toObject(),
                      service_name: matchingProfile.service_name,
                      User_name:matchingprofile.User_name,
                      location:matchingprofile.location,
                     vendorImage:vendorImage, 
                     vendorName:vendorName,
                    
                }
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}
