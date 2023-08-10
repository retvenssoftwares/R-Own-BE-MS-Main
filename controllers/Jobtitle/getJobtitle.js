
const getjob =require('../../models/jobtitle')
module.exports= async (req, res) => {
    try {
      const compdata = await getjob.find();
      if (!compdata) {
        return res.status(404).json({ error: 'job name not found' });
      }
      return res.status(200).json(compdata);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };