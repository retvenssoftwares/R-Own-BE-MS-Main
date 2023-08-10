const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updateprofile = require('../../controllers/User/updateUserprofile');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/update/:User_id',upload.single('Profile_pic'), updateprofile)
module.exports = app;