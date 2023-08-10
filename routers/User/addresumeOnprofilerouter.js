const multer = require('multer');
const { Router } = require('express');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const profile = require('../../controllers/User/addresumeOnprofile');
const app = Router();

//app.patch('/addresume/:User_id',upload.single('resume'), profile);
app.patch('/main/addResume/:User_id', profile);
module.exports = app;   