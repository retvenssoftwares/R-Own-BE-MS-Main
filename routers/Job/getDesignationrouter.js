const { Router } = require('express');
const getdesignation = require('../../controllers/Job/getDesignation');
const app = Router();
app.get('/main/getdesignation', getdesignation);
module.exports = app;