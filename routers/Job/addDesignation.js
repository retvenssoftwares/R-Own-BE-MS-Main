const { Router } = require('express');
const designation = require('../../controllers/Job/addDesignation');
const app = Router();
app.post('/main/designationpost', designation);
module.exports = app;