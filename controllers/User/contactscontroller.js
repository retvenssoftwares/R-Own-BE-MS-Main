//models path
const Contacts = require('../../models/contacts');

module.exports= async (req, res) => {
  const { User_id, ContactDetails } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Contacts.findOne({ User_id });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create the new contact document
    const newContact = new Contacts({ User_id, ContactDetails });
    await newContact.save();
    res.status(201).json({ message: 'Contact created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
