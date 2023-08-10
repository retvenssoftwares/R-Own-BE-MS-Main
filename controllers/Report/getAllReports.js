const getReport = require('../../models/report')

module.exports=(req,res)=>{
    getReport.find({}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.json(data);
      }
  
  });
  }