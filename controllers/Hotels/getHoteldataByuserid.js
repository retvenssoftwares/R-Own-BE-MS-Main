const hotel = require('../../models/Hotels');

module.exports= async (req, res) => {
    try {
      const Hotel = await hotel.find({ user_id: req.params.user_id },'display_status hotelName hotelAddress hotelRating hotelCoverpicUrl hotel_id ').sort({date_added:-1});
      
      if (!Hotel) {
        return res.status(404).json({ error: 'hotel not found' });
      }
      return res.status(200).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };