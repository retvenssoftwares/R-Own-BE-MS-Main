const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const postJob = require('../../controllers/Job/postJobApplication');
const app = Router();

app.post('/main/applyjob',upload.single('resume'), postJob);
module.exports = app;