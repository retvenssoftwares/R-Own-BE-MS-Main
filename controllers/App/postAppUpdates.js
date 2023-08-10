const appupdates = require('../../models/appUpdate');

 module.exports=async (req, res) => {
    const { updateDescription, updateTitle, updateLink, Android_version, IOS_version,appStore,playStore } = req.body;  
    try {       
      // Create the new contact document
      const newUpdate = new appupdates({ updateDescription, updateTitle, updateLink, Android_version, IOS_version,appStore,playStore });
      await newUpdate.save();
      res.status(201).json({ message: 'Update posted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };