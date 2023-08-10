const { Router } = require('express');
const getblog = require('../../controllers/Blog/fetchBlog');
const app = Router();
app.get('/main/fetchBlog', getblog);
module.exports = app;