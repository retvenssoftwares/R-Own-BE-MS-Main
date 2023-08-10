const multer = require('multer');
const { Router } = require('express');
// const upload = multer();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const profile = require('../../controllers/User/userProfile');
const app = Router();

app.post('/main/profile',upload.single('Profile_pic'), profile);
module.exports = app;