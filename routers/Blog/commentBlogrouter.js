const { Router } = require('express');
const commentblog = require('../../controllers/Blog/commentBlog');
const app = Router();
app.patch('/main/comment/:blog_id', commentblog);
module.exports = app;