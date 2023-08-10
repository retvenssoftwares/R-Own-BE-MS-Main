const job = require('../../models/job')

module.exports= async(req,res)=>{
    const data = await job.findOne({jid:req.params.jid})
    res.json(data)


    try {
        const userId = req.params.user_id; 
    
        const data = await job.findOne({jid:req.params.jid});
    
        const populatedData = await Promise.all(data.map(async (job) => {
          const hotel = await hotelLogo.findOne({ user_id: userId }, 'hotelLogoUrl');
          return { ...job._doc, hotelLogoUrl: hotel.hotelLogoUrl };
        }));
    
        res.status(200).json(populatedData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}