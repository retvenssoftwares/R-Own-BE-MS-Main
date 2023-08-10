const { Router } = require('express');
const getApplicant = require('../../controllers/Job/getJobapplicant');
const app = Router();
app.get('/main/getapplicant/:jid', getApplicant);
module.exports = app;