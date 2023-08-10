const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');

//models path
const Profile = require('../../models/Profile');

 module.exports=async (req, res) => {
    try {
      const { user_id } = req.params;
      const { hotelownerName, hotelDescription, hotelType, hotelCount, websiteLink, bookingEngineLink} = req.body;
      
      // Find the profile with the given user_id
      const profile = await Profile.findOne({ User_id: user_id });
  
      if (!profile) {
        return res.status(404).json({ msg: 'Profile not found' });
      }
  
      // Update the hotel owner fields
      profile.hotelOwnerInfo.hotelownerName = hotelownerName || profile.hotelOwnerInfo.hotelownerName;
      profile.hotelOwnerInfo.hotelDescription = hotelDescription || profile.hotelOwnerInfo.hotelDescription;
      profile.hotelOwnerInfo.hotelType = hotelType || profile.hotelOwnerInfo.hotelType;
      profile.hotelOwnerInfo.hotelCount = hotelCount || profile.hotelOwnerInfo.hotelCount;
      profile.hotelOwnerInfo.websiteLink = websiteLink || profile.hotelOwnerInfo.websiteLink;
      profile.hotelOwnerInfo.bookingEngineLink = bookingEngineLink || profile.hotelOwnerInfo.bookingEngineLink;
          // Save the updated profile to the database
      await profile.save();
  
      res.json({message: "hotelowner data updated successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };

