const mongoose = require('mongoose');
const shortid = require("shortid");
const moment = require('moment-timezone')
const reportSchema = new mongoose.Schema({

    reportID:{
        type: String,
        default: shortid.generate
    },
    reporterUserId:{
        type:String,
        default:""
    },
    reportedUserId:{
        type:String,
        default:""
    },
    post_id:{
        type:String,
        default:""
    },
    reportType:{type:String,default:""},
    
    
    date_added: {
        type: String,
        // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    },
    Reason:{type:String,default:""},      
    
});
const userReport = mongoose.model('report',reportSchema);
module.exports = userReport;