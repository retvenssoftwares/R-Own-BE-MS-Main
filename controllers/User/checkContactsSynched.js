const contact = require('../../models/contacts');
module.exports = async (req, res) => {
    try {
      const contactArray = await contact.findOne({ User_id: req.body.User_id });
      if (contactArray && contactArray.ContactDetails.length > 0) {
        res.json({ message: "Synced" });
      } else {
        res.json({ message: "Not Synced" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };