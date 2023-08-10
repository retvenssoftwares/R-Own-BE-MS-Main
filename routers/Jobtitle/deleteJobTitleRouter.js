const { Router } = require('express');
const deletejobtitle = require('../../controllers/Jobtitle/deleteJobTitle');
const app = Router();
app.delete('/main/deleteTitle/:jobID', deletejobtitle);
module.exports = app;