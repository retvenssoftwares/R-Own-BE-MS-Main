const mongoose = require('mongoose');
const shortid = require("shortid");
const job = new mongoose.Schema({
  user_id: {
    type: String
  },
  jobApplicants: [{
    user_id: String,
    applicationId: String
  }],


  jid: {type:String,default:""},

  jobCategory:{type:String,default:""},
  jobTitle:{type:String,default:""},
  companyName: {type:String,default:""},
  workplaceType: {type:String,default:""},
  jobType:{type:String,default:""},
  designationType:{type:String,default:""},
  noticePeriod:{type:String,default:""},
  expectedCTC:{type:String,default:""},
  jobLocation:{type:String,default:""},
  jobDescription:{type:String,default:""},
  skillsRecq:{type:String,default:""},
  Bookmarked: [{
    user_id: String
      
  }],

  display_status: {
    type: String,
    default: "1"
  },

  vendorimg:{
    type:String
  },
  hotelLogoUrl:{
    type:String,
    default: ""
  },
  hotel_id:{
    type:String,
    default: ""
  }


})

const jobdata = mongoose.model('jobdata', job);

module.exports = jobdata;
