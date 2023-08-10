const { Router } = require('express');
const updatejob = require('../../controllers/Job/updateJobApplication');
const app = Router();

app.patch('/main/updatejob/:applicationId', updatejob);
module.exports = app;