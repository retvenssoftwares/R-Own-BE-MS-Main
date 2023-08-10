const reqjob =require('../../models/requestjob')
 module.exports = async (req, res) => {
    try {
        const jobrequest = await reqjob.findOne({userID: req.params.userID});
        if (!jobrequest) {
          return res.status(404).send({message: "Job request not found"});
        }
    
        jobrequest.designationType = req.body.designationType || jobrequest.designationType;
        jobrequest.noticePeriod = req.body.noticePeriod || jobrequest.noticePeriod;
        jobrequest.preferredLocation = req.body.preferredLocation || jobrequest.preferredLocation;
        jobrequest.jobDescription = req.body.jobDescription || jobrequest.jobDescription;
        jobrequest.expectedCTC = req.body.expectedCTC || jobrequest.expectedCTC;
        jobrequest.department = req.body.department || jobrequest.department;
    
        const updatedJobRequest = await jobrequest.save();
        res.status(200).send({message: "Job request updated successfully"});
      } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
      }
    };