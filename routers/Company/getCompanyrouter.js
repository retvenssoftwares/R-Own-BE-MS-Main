const { Router } = require('express');
const getcompany = require('../../controllers/Company/getCompany');
const app = Router();

app.get('/main/getCompany',getcompany);
module.exports = app;
//