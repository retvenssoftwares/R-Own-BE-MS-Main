const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updategroup = require('../../controllers/Community/updateGroup');
const app = Router();

app.patch('/main/updateGroup/:group_id', upload.single('Profile_pic'), updategroup);
module.exports = app;