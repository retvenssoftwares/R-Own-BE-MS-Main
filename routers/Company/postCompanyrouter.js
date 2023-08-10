const { Router } = require('express');
const company = require('../../controllers/Company/postCompany');
const app = Router();

app.post('/main/company',company);
module.exports = app;