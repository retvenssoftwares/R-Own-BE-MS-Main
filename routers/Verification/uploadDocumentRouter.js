const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const feed = require('../../controllers/Verification/uploadDocuments');
const app = Router();
app.post('/main/document', upload.array('Documents'),feed)

module.exports = app;