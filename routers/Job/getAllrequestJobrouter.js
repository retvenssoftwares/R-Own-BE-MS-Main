const { Router } = require('express');
const requestjob = require('../../controllers/Job/getAllrequestJob');
const app = Router();
app.get('/main/getrequestjob', requestjob);
module.exports = app;