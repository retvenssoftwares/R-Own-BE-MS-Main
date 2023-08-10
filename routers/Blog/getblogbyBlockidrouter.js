const { Router } = require('express');
const getliked = require('../../controllers/Blog/getblogbyBlogid');
const app = Router();

app.get('/main/getBlog/:blog_id/:user_id',getliked );
module.exports = app;