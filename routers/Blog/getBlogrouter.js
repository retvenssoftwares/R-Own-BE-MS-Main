const { Router } = require('express');
const getblog = require('../../controllers/Blog/getBlog');
const app = Router();

app.get('/main/getBlogPost/:User_id',getblog);
module.exports = app;