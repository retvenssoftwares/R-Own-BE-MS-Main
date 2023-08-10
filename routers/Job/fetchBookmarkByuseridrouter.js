const { Router } = require('express');
const requestjob = require('../../controllers/Job/findBookmarkbyUserid');
const app = Router();
app.get('/main/getbookmarkb/:user_id', requestjob);
module.exports = app;