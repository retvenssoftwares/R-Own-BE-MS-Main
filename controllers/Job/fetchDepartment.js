const department_collection = require('../../models/department')

module.exports=async(req,res)=>{
    department_collection.find({}, (error,data) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(data);
        }
    
    });
};
  