const { Router } = require('express');
const updateComp = require('../../controllers/Company/updateCompany');
const app = Router();
app.patch('/main/updateComp/:companyId', updateComp);
module.exports = app;