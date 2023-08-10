const bug =require('../../models/spottedBug')
module.exports= async (req, res) => {
    try {
      const Bug = await bug.find();
      if (!Bug) {
        return res.status(404).json({ error: 'spotted bug  not found' });
      }
      return res.status(200).json(Bug);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };