
const gethotelname =require('../../models/Hotels')
module.exports= async (req, res) => {
    try {
      const compdata = await gethotelname.find({},'hotelName display_status hotel_id');
      if (!compdata) {
        return res.status(404).json({ error: 'hotel name not found' });
      }
      return res.status(200).json(compdata);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };