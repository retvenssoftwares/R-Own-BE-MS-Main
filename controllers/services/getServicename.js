const getservice =require('../../models/brandservices')
module.exports= async (req, res) => {
    try {
      const compdata = await getservice.find();
      if (!compdata) {
        return res.status(404).json({ error: 'service name not found' });
      }
      return res.status(200).json(compdata);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };