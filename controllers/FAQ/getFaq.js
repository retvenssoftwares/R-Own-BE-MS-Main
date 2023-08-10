

const Faq = require('../../models/faq');

module.exports = async (req, res) => {
  try {
    // const displayStatus = "1"; // Filter value for display_status

    // Use the displayStatus in the query to get only FAQs with display_status "1"
    const getfaq = await Faq.find({ display_status: "1" });

    if (!getfaq || getfaq.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    return res.status(200).json(getfaq);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
