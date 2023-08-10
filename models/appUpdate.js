const mongoose = require('mongoose');
const shortid = require("shortid");
//hotel owner's schema
const appSchema = new mongoose.Schema({

    update_id:{
        type: String,
        default: shortid.generate,
    },
    displayStatus: {
        type: String,
        default: "1"
    },

    updateDescription:{type:String,default:""},

    Android_version:{type:String,default:""},

    iOS_version:{type:String,default:""},

    updateTitle:{type:String,default:""},
    updateLink:{type:String,default:""},
    appStore:{type:String,default:""},
    playStore:{type:String,default:""},
    iOSUpdateLink:{type:String,default:""},

})

const updateApp = mongoose.model('updates', appSchema);
module.exports = updateApp;