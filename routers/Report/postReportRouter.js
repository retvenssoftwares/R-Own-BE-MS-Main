const {Router} = require('express');
const report = require('../../controllers/Report/postReport');
const app = Router();

app.post('/main/report', report);
module.exports = app;