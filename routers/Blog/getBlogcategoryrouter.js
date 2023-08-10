const { Router } = require('express');
const getcategory = require('../../controllers/Blog/getBlogcategory');
const app = Router();

app.get('/main/getCategory',getcategory);
module.exports = app;