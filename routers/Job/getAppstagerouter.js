const { Router } = require('express');
const jobstage = require('../../controllers/Job/getApplicationstage');
const app = Router();
app.get('/main/jobapplications/:status', jobstage);
module.exports = app;