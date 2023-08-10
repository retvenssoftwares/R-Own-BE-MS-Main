const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const blog = require('../../controllers/Blog/blogCategoryDel');
const app = Router();

app.patch('/main/blogCategoryDel/:category_id', blog);
module.exports = app;





