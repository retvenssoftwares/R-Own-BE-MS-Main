const mongoose = require('mongoose');

//hotel owner's schema
const blockedByUserSchema = new mongoose.Schema({
    
    User_id:{type:String,default:""},
    blockedByUser:[{
        user_id:{
            type:String,
        }
    }]
})
const updateApp = mongoose.model('blockedByUsers', blockedByUserSchema);
module.exports = updateApp;