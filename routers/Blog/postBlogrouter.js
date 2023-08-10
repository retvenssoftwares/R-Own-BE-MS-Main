const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const blog = require('../../controllers/Blog/postBlog');
const app = Router();

app.post('/main/blog',upload.single('blog_image'), blog);
module.exports = app;