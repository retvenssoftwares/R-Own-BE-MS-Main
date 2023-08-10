const jobappi =require('../../models/jobApplication')

module.exports=(req,res)=>{
    jobappi.find({jobId:req.params.jobId}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(data);
      }
  
  });
  }