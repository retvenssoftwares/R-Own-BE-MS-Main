const { Router } = require('express');
const getservice = require('../../controllers/vendors/getServicesNamebyvendorid');
const app = Router();

app.get('/main/getVendorService/:user_id',getservice);
module.exports = app;