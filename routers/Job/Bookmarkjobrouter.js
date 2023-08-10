const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const postJob = require('../../controllers/Job/Bookmarkjob');
const app = Router();

app.patch('/main/bookmark_job/:User_id/:jid', postJob);

module.exports = app;