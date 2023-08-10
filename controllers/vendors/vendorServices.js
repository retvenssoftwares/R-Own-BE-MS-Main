// models path
const Vendor =require('../../models/vendor')

module.exports=async (req, res) => {
    try{
        const vendorData = new Vendor({
            user_id: req.body.user_id,
            vendorServiceName: req.body.vendorServiceName,
          });
          const vendor = await Vendor.findOne({ user_id:req.body.user_id });
          if(vendor){
          res.status(200).send({message:"vendor already exist"})
         
      }else{
          await vendorData.save();
          res.json({message: "vendor added successfully"});
      }
    }catch (error) {
        console.error(error);
        res.status(500).send({message: 'Server error'});
      }
};