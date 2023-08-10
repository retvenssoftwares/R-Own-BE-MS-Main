const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const postJob = require('../../controllers/Job/pushJobId');
const app = Router();

app.patch('/main/pushid/:jid', postJob);
module.exports = app;