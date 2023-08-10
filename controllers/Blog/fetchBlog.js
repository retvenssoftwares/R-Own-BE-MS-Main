const blog =require('../../models/blogs')

module.exports=(req,res)=>{
    blog.find({ display_status: "1" }, (error,data) => {
        
      if (error) {
          res.status(500).send(error);
      } else {
          res.send(data);
      }
  
  });
  }