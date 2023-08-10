const JobData =require('../../models/job')

module.exports=(req,res)=>{
    JobData.find({user_id:req.params.user_id}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(data);
      }
  
  });
  }