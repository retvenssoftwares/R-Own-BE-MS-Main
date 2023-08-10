const mongoose = require("mongoose");

const shortid = require("shortid");
const jobrequest_schema = new mongoose.Schema({
    
        userID:{
            type: String
        },     
        requestjob_id:{
            type: String,
            default: shortid.generate
        },
        designationType:{type:String,default:""},
        noticePeriod:{type:String,default:""},
        department:{type:String,default:""},
       
        preferredLocation:{type:String,default:""},
        
        expectedCTC:{type:String,default:""},
        employmentType:{type:String,default:""},
        status:{
            type:String,
            default: "not requested"
        },
        display_status:{
            type:String,
            default:"1"
        }
      
})

const jobrequest = mongoose.model('jobrequest', jobrequest_schema);
module.exports = jobrequest;