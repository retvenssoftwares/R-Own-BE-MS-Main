const getdesignation = require('../../models/designation')

module.exports=(req,res)=>{
    getdesignation.find({display_status : "1", addedbyUser : "false"}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(data);
      }
  
  });
  }