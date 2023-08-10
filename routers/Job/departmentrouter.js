const { Router } = require('express');
const requestjob = require('../../controllers/Job/department');
const app = Router();
app.post('/main/addDepartment', requestjob);
module.exports = app;