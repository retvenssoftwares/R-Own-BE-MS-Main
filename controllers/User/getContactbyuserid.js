//models path
const Contact = require('../../models/contacts');

module.exports= async (req, res) => {
    try {
      const post = await Contact.findOne({ User_id: req.params.User_id });
      if (!post) {
        return res.status(404).json({ error: 'contact not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };