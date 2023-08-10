const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updateevent = require('../../controllers/Events/updateEvent');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/updateEvent/:event_id',upload.single('event_thumbnail'), updateevent)
module.exports = app;