const { Router } = require('express');
const deletecompany = require('../../controllers/Company/deleteCompany');
const app = Router();
app.delete('/main/deleteCompany/:company', deletecompany);
module.exports = app;