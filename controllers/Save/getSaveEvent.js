const saved = require('../../models/saved'); // Import the 'saved' model

module.exports = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10; // Number of jobs per page
  const { user_id } = req.params;

  try {
    // Find the document based on user_id
    const eventDocument = await saved.findOne({ user_id });

    if (!eventDocument) {
      return res.status(404).json({ message: 'No events found for the user.' });
    }

    const events = eventDocument.saveall_id.Events || [];

    const totalevents = events.length;
    const totalPages = Math.ceil(totalevents / pageSize);

    if (page > totalPages) {
      return res.json([{ message: 'You have reached the end.' }]);
    }

    const skip = (page - 1) * pageSize;

    // Retrieve jobs using pagination
    const paginatedevents = events.slice(skip, skip + pageSize);

    res.json([{
      page,
      pageSize,
      //totalJobs,
      //totalPages,
      events: paginatedevents
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
