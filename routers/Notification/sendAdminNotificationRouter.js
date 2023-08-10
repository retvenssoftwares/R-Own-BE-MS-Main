const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const getpersonalNotifs = require('../../controllers/Notifications/sendAdminNotification');
const app = Router();
app.post('/main/sendAdminNotification',upload.single('image'), getpersonalNotifs);
module.exports = app;