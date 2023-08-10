
//models path
const hotel = require('../../models/Hotels');

module.exports= async (req, res) => {
    try {
      const Hotel = await hotel.findOne({ hotel_id: req.params.hotel_id });
      if (!Hotel) {
        return res.status(404).json({ error: 'hotel not found' });
      }
      return res.status(200).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };