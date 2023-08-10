const { Router } = require('express');
const getrequestjob = require('../../controllers/Job/getRequestejobbyuserid');
const app = Router();
app.get('/main/reqjobofuser/:userID', getrequestjob);
module.exports = app;