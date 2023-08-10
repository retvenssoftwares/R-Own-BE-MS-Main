const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const event = require('../../controllers/Events/eventCategory');
const app = Router();

app.post('/main/eventCategory',upload.single('Image'), event);
module.exports = app;