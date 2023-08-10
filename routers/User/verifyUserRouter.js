const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const verifyUser = require('../../controllers/User/verifyUser');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/verify/:User_id', verifyUser)
module.exports = app;