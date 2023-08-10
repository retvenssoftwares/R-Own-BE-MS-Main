const event = require('../../models/eventCategory');
const Event = require('../../models/events');

module.exports = async (req, res) => {
  try {
    const categories = await event.find();
    if (!categories) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    const categoryCounts = [];
    for (const category of categories) {
      const count = await Event.countDocuments({ category_id: category.category_id });
      categoryCounts.push({
        category_id: category.category_id,
        category_name: category.category_name,
        Image: category.Image,
        event_count: count
      });
    }

    return res.status(200).json(categoryCounts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
