const Company =require('../../models/company')
module.exports= async (req, res) => {
    try {
      const compdata = await Company.find({addedbyUser:"false"});
      if (!compdata) {
        return res.status(404).json({ error: 'Company not found' });
      }
      return res.status(200).json(compdata);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };