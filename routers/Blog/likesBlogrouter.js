const { Router } = require('express');
const liked = require('../../controllers/Blog/likesBlog');
const app = Router();

app.patch('/main/likeBlog/:blog_id',liked );
module.exports = app;