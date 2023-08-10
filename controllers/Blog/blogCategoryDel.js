const blog =require('../../models/blogCategories')

module.exports=(req,res)=>{
    blog.deleteOne({category_id: req.params.category_id}, (error,data) => {
      if (error) {
          res.status(500).send(error);
      } else {
          res.status(200).json({message: "Deleted successfully"});
      }
  
  });
  }