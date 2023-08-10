const { Router } = require('express');
const getliked = require('../../controllers/Blog/getLikebyblogid');
const app = Router();

app.get('/main/getLike/:blog_id',getliked );
module.exports = app;