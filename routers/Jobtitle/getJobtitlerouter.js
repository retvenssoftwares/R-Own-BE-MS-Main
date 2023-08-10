const { Router } = require('express');
const getjob = require('../../controllers/Jobtitle/getJobtitle');
const app = Router();

app.get('/main/getJobTitle',getjob);
module.exports = app;