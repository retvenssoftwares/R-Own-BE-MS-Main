const requestjob = require('../../models/requestjob')
const profile = require('../../models/Profile')

module.exports = async (req, res) => {
    try {
        const jobRequests = await requestjob.find({})
        const profiles = await profile.find({})
        
        const result = jobRequests.map(job => {
            const matchingProfile = profiles.find(profile => profile.User_id === job.userID)
            if (!matchingProfile) {
                return {
                    ...job.toObject(),
                    Full_name: null,
                    Profile_pic: null,
                    verificationStatus: null,
                    Location: null,
                    Role: null
                }
            } else {
                return {
                    ...job.toObject(),
                    Full_name: matchingProfile.Full_name,
                    Profile_pic: matchingProfile.Profile_pic,
                    verificationStatus: matchingProfile.verificationStatus,
                    Location: matchingProfile.location,
                    Role: matchingProfile.Role
                }
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}
