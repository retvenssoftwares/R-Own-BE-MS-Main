const { Router } = require('express');
const fetchSavedBlog = require('../../controllers/Save/getSavedBlog');
const app = Router();
app.get('/main/getSavedBlogs/:user_id', fetchSavedBlog);
module.exports = app;