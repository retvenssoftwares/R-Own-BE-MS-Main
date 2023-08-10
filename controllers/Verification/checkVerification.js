const verify = require('../../models/verification');
  module.exports= async (req, res) => {
    try {
      const Verify = await verify.findOne({ user_id: req.params.user_id });
      if (!Verify) {
        return res.status(200).json({ message: ' not applied' });
      }else{
        return res.status(200).json({ message: 'applied' });
      }      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };