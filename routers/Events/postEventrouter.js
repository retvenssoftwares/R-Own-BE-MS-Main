const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const postevent = require('../../controllers/Events/postEvent');
const app = Router();

app.post('/main/postEvent',upload.single('event_thumbnail'), postevent);
module.exports = app;