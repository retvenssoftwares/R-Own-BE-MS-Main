const { Router } = require('express');
const replyblog = require('../../controllers/Blog/replyComment');
const app = Router();
app.patch('/main/replyComment/:blog_id', replyblog);
module.exports = app;