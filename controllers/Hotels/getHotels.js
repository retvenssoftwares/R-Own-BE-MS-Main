
const gethotel =require('../../models/Hotels')

module.exports=(req,res)=>{
    gethotel.find({}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(data);
      }
  
  });
  }