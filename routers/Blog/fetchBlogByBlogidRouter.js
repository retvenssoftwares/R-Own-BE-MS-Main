const { Router } = require('express');
const getblog = require('../../controllers/Blog/fetchBlogByBlogid');
const app = Router();

app.get('/main/fetchBlog/:blog_id',getblog );
module.exports = app;