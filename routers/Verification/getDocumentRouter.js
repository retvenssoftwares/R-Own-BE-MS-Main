const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const getdocument = require('../../controllers/Verification/getDocument');
const app = Router();
app.get('/main/getDocument',getdocument)

module.exports = app;