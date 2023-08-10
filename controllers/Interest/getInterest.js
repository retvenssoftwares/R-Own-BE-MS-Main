//models interest
const Interest  = require("../../models/interest");
module.exports = async(req,res)=>{
    Interest.find({}, (error, blogposts) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(blogposts);
      }
  });  
  
  }