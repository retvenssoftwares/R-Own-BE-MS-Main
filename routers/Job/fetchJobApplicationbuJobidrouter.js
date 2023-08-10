const { Router } = require('express');
const fetchjob = require('../../controllers/Job/fetchJobApplicationbyjobid');
const app = Router();
app.get('/main/fetchjob/:jobId', fetchjob);
module.exports = app;