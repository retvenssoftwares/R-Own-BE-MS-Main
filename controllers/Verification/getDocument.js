const verify =require('../../models/verification')

module.exports=(req,res)=>{
    verify.find({}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(data);
      }
  
  });
  }