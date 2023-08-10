const { Router } = require('express');
const jobapplied = require('../../controllers/Job/fetchJobApplicationbyUser');
const app = Router();
app.get('/main/appliedjob/:user_id', jobapplied);
module.exports = app;