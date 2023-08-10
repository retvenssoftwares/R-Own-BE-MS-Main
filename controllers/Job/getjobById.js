const JobData =require('../../models/job')
const hotelLogo = require('../../models/Hotels')

module.exports = async (req, res) => {
    try {
      const userId = req.params.user_id; 
  
      const data = await JobData.find({ user_id: userId }, 'user_id jid jobType expectedCTC jobLocation');
  
      const populatedData = await Promise.all(data.map(async (job) => {
        const hotel = await hotelLogo.findOne({ user_id: userId }, 'hotelLogoUrl');
        return { ...job._doc, hotelLogoUrl: hotel.hotelLogoUrl };
      }));
  
      res.status(200).json(populatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
