//models interest
const getappUpdates  = require("../../models/appUpdate");
module.exports = async(req,res)=>{
    getappUpdates.find({}, (error, data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(data);
      }
  });
    
  }