const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const Admin = require('../../controllers/Admin/adminPost')
const app = Router();

app.post('/main/adminPost/:user_id', upload.array('media'), Admin);

module.exports = app;