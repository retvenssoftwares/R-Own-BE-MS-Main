const multer = require('multer');
const { Router } = require('express');
const upload = multer();
const rejectDocument = require('../../controllers/Verification/rejectApplication');
const app = Router();
app.patch('/main/rejectApplication/:user_id', rejectDocument)

module.exports = app;