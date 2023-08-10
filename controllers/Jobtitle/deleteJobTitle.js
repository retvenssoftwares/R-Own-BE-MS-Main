const jobtitle = require('../../models/jobtitle');

module.exports = async (req, res) => {
  try {
    const jobid = req.params.jobID;

    // Find the job document that matches the provided jobid
    const job = await jobtitle.findOne({ jid: jobid });

    if (job) {
      // Delete the entire job record from the collection
      await jobtitle.deleteOne({ jid: jobid });

      return res.status(200).json({ message: 'Job deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
