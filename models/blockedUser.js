const mongoose = require('mongoose');

//hotel owner's schema
const blockedUserSchema = new mongoose.Schema({
    

  
    User_id:{type:String,default:""},
    blockedUser:[{
        user_id:{
            type:String,
        },
        Full_name:{type:String,default:""},
        Profile_pic:{type:String,default:""},
        verificationStatus:{type:String,default:""},
        Role:{type:String,default:""},
    }]
})

const updateApp = mongoose.model('blockedUsers', blockedUserSchema);
module.exports = updateApp;