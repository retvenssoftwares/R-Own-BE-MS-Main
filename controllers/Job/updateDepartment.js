const department =require('../../models/department')
 module.exports = async (req, res) => {
    try {
        const updatedepartment = await department.findOne({
            department_id: req.params.department_id});
        if (!updatedepartment) {
          return res.status(404).send({message: "Job request not found"});
        }
    
        updatedepartment.department = req.body.department || updatedepartment.department;
        updatedepartment.display_status = req.body.display_status || updatedepartment.display_status;
        
        const updatedJobRequest = await updatedepartment.save();
        res.status(200).send({message: "department updated successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
      }
    };