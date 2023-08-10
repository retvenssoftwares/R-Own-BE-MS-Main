const designations =require('../../models/designation')
 module.exports = async (req, res) => {
    try {
        const designation = await designations.findOne({designation_id: req.params.designation_id});
        if (!designation) {
          return res.status(404).send({message: "designation not found"});
        }
    
        designation.designation_name = req.body.designation_name || designation.designation_name;
        designation.addedbyUser = req.body.addedbyUser || designation.addedbyUser;
        designation.display_status = req.body.display_status || designation.display_status;
                    
        const design = await designation.save();
        res.status(200).send({message: "Designation updated successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
      }
    };