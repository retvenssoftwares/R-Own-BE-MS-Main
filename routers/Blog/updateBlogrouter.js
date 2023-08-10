const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const updateblog = require('../../controllers/Blog/updateBlog');
const app = Router();

app.patch('/main/updateBlogData/:blog_id', updateblog);
module.exports = app;




