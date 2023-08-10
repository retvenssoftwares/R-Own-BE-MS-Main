//models interest
const getadminPosts  = require("../../models/adminPost");
module.exports = async(req,res)=>{
    const post_type = req.params.post_type;
    getadminPosts.find({post_type: post_type}, (error, data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(data);
      }
  });
    
  }