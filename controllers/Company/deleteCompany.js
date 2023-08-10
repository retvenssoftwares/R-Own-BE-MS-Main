const company = require('../../models/company');

module.exports = async (req, res) => {
  try {
    const companyid = req.params.company;

    // Find the job document that matches the provided jobid
    const companyId = await company.findOne({ company_id: companyid });

    if (companyId) {
      // Delete the entire job record from the collection
      await company.deleteOne({ company_id: companyid });

      return res.status(200).json({ message: 'company deleted successfully' });
    } else {
      return res.status(404).json({ message: 'company not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
