const { Router } = require('express');
const updatejob = require('../../controllers/Job/patchJob');
const app = Router();
app.patch('/main/jobadd/:jid', updatejob);
module.exports = app;