const mongoose = require('mongoose');
const shortid = require("shortid");
const moment = require('moment-timezone');
const notifySchema = new mongoose.Schema({


    user_id: {
        type: String,
        default: ""
    },

    
    notifications: {
        likesNotification: [{ post_id:{type:String,default:""},post_type:{type:String,default:""}, body: {type:String,default:""},Profile_pic:{type:String,default:""}, Full_name:{type:String,default:""},user_id:{type : String} , User_name:{type:String,default:""},verificationStatus:{type:String,default:""},date_added: {
            type: String,
           // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },Media:{type:String} }],
        commentNotification: [{ post_id: { type: String },post_type:{type:String,default:""}, body:{type:String,default:""}, Profile_pic:{type:String,default:""}, Full_name:{type:String,default:""},user_id:{type:String,default:""},User_name:{type:String,default:""},verificationStatus:{type:String,default:""}, comment_id : {type: String},date_added: {
            type: String,
           // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },Media:{type:String}}],
        requestNotification: [{ body:{type:String,default:""}, Role:{type:String,default:""}, Profile_pic:{type:String,default:""},verificationStatus:{type:String,default:""}, Full_name:{type:String,default:""},user_id:{type:String,default:""}, User_name:{type:String,default:""},date_added: {
            type: String,
            // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },}],
        acceptNotification: [{ body:{type:String,default:""}, Role:{type:String,default:""},Profile_pic:{type:String,default:""},verificationStatus:{type:String,default:""}, Full_name:{type:String,default:""},user_id:{type:String,default:""},User_name:{type:String,default:""},date_added: {
            type: String,
            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        },}],
        JobNotifications: [{ body: { type: String }, Full_name:{type:String,default:""},user_id:{type : String},date_added: {
            type: String,
            //default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        }, }],
        CallNotifications: [{ body: { type: String }, Full_name:{type:String,default:""},user_id:{type : String}, callType: {type: String},Profile_pic:{type:String,default:""},verificationStatus:{type:String,default:""},date_added: {
            type: String,
            // default: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
        } }]
    }
});
const userNotification = mongoose.model('notification', notifySchema);
module.exports = userNotification;