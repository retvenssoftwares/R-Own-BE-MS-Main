const jobdata =require('../../models/job')
 module.exports=async (req, res) => {
    try {
      
      //const {jobCategory, skillsRecq, jobDescription, jobTitle, companyName, workplaceType, jobType, designationType, noticePeriod, minSalary, maxSalary, jobLocation } = req.body;
  
        
      // Find the job with the given user_id
      const Job_data = await jobdata.findOne({jid:req.params.jid}); 

      if(!Job_data){
        return res.status(404).send({message: "Job not found"});
      }
      Job_data.designationType = req.body.designationType || Job_data.designationType;
      Job_data.noticePeriod = req.body.noticePeriod || Job_data.noticePeriod;
      Job_data.expectedCTC = req.body.expectedCTC || Job_data.expectedCTC;
      Job_data.preferredLocation = req.body.preferredLocation || Job_data.preferredLocation;
      Job_data.employmentType = req.body.preferredLocation || Job_data.employmentType;
      Job_data.department = req.body.department || Job_data.department;
      Job_data.display_status = req.body.display_status || Job_data.display_status;

      await Job_data.save();
  
      res.json({message: "Job updated successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };