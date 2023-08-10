const { Router } = require('express');
const requestjob = require('../../controllers/Job/candidateDetailsGet');
const app = Router();
app.get('/main/getcandidate/:applicationId', requestjob);
module.exports = app;