const saved = require('../../models/saved'); // Import the 'saved' model

module.exports = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10; // Number of jobs per page
  const { user_id } = req.params;

  try {
    // Find the document based on user_id
    const hotelDocument = await saved.findOne({ user_id });

    if (!hotelDocument) {
      return res.status(404).json({ message: 'No hotels found for the user.' });
    }

    const hotels = hotelDocument.saveall_id.Hotels || [];

    const totalhotels = hotels.length;
    const totalPages = Math.ceil(totalhotels / pageSize);

    if (page > totalPages) {
      return res.json([{ message: 'You have reached the end.' }]);
    }

    const skip = (page - 1) * pageSize;

    // Retrieve jobs using pagination
    const paginatedhotels = hotels.slice(skip, skip + pageSize);

    res.json([{
      page,
      pageSize,
      //totalJobs,
      //totalPages,
      hotels: paginatedhotels
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};