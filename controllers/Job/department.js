const department_collection = require('../../models/department')

module.exports=async(req,res)=>{
    const job_details = new department_collection(req.body);
    await job_details.save()
    res.json({message:"department save successfully!!"})
  };
  