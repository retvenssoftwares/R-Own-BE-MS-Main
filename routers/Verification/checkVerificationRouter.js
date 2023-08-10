const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const getdocument = require('../../controllers/Verification/checkVerification');
const app = Router();
app.get('/main/checkVerification/:user_id',getdocument)

module.exports = app;