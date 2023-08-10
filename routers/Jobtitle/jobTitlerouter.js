const { Router } = require('express');
const postjob = require('../../controllers/Jobtitle/jobTitle');
const app = Router();

app.post('/main/jobTitle',postjob);
module.exports = app;