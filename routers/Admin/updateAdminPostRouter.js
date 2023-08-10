const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updateadminpost = require('../../controllers/Admin/updateAdminPost');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/updateAdminPost/:adminpostId', updateadminpost)
module.exports = app;