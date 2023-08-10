
//models path
const hotel = require('../../models/Hotels');
const profile = require('../../models/Profile')
const save = require('../../models/saved');
module.exports = async (req, res) => {
  const { User_id, user_id } = req.params;

  try {
    const Hotel = await hotel.find({ user_id: user_id }).sort({ date_added: -1 });
    if (!Hotel) {
      return res.status(404).json({ error: 'hotel not found' });
    }
    const User = await profile.find({ User_id: User_id });
    if (!User) {
      return res.status(404).json({ error: 'user not found' });
    }
    const Saved = await save.find({ user_id: User_id });

    const result = Hotel.map(hotel => {
      const matchingSavedhotel = Saved.find(profile =>
        profile.saveall_id.Hotels.some(savedhotel => savedhotel.hotelid === hotel.hotel_id)
      );
      let saved = 'not saved';

      if (matchingSavedhotel) {
        saved = 'saved';
      }

      return {
        ...hotel.toObject(),
        saved: saved,

      };
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};