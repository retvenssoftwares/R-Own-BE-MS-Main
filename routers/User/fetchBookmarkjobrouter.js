const { Router } = require('express');
const fetchbookmark = require('../../controllers/User/fetchBookmarkjob');
const app = Router();
app.get('/main/getBookmark/:user_id', fetchbookmark);
module.exports = app;