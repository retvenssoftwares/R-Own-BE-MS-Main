const { Router } = require('express');
const getblog = require('../../controllers/Blog/getBlogbyUserid');
const app = Router();
app.get('/main/blog/:User_id', getblog);
module.exports = app;