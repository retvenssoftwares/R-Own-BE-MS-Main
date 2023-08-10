const { Router } = require('express');
const getcommentblog = require('../../controllers/Blog/getCommentblog');
const app = Router();
app.get('/main/getComment/:blog_id', getcommentblog);
module.exports = app;