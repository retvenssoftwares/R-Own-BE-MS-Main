const { Router } = require('express');
const updatereqjob = require('../../controllers/Job/patchRequestedJob');
const app = Router();
app.patch('/main/jobupdate/:userID', updatereqjob);
module.exports = app;