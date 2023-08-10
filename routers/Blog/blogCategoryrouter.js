const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const blog = require('../../controllers/Blog/blogCategory');
const app = Router();

app.post('/main/blogCategory',upload.single('Image'), blog);
module.exports = app;





