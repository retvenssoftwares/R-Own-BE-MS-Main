const { Router } = require('express');
const multer = require('multer');
const group = require('../../controllers/Mesibo/createGroup')
const app = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.post('/main/createGroup/:User_id',upload.single('image'), group);
module.exports = app;