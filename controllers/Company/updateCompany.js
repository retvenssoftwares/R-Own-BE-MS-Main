const companyD = require('../../models/company')
 module.exports = async (req, res) => {
    try {
        const companyReco = await companyD.findOne({company_id: req.params.companyId});
        if (!companyReco) {
          return res.status(404).send({message: "Company not found"});
        }    
        
        companyReco.company_name = req.body.company_name || companyReco.company_name;
    
        const updatedJobRequest = await companyReco.save();
        res.status(200).send({message: "Company updated successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
      }
    };