const { Router } = require('express');
const requestjob = require('../../controllers/Job/requestjob');
const app = Router();
app.post('/main/requestJob', requestjob);
module.exports = app;