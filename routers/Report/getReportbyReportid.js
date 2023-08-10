const { Router } = require('express');
const getReports = require('../../controllers/Report/getReportbyReportid');
const app = Router();

app.get('/main/getReport/:reportId', getReports );
module.exports = app;