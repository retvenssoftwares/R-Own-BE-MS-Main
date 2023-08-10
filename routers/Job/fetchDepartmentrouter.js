const { Router } = require('express');
const requestjob = require('../../controllers/Job/fetchDepartment');
const app = Router();
app.get('/main/fetchdepartment', requestjob);
module.exports = app;