const { Router } = require('express');
const getAllReports = require('../../controllers/Report/getAllReports');
const app = Router();

app.get('/main/getAllReports', getAllReports );
module.exports = app;