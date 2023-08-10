const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const profile = require('../../controllers/Community/addUsergroup');
const app = Router();

app.post('/main/userGroup',upload.single('Profile_pic'), profile);
module.exports = app;