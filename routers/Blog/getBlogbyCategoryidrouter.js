const { Router } = require('express');
const getblog = require('../../controllers/Blog/getBlogbyCategoryid');
const app = Router();
app.get('/main/getBlogCategory/:User_id/:category_id', getblog);
module.exports = app;