const { Router } = require('express');
const update = require('../../controllers/Job/updateDepartment');
const app = Router();
app.patch('/main/updatedepartment/:department_id', update);
module.exports = app;