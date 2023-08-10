const { Router } = require('express');
const deleteservice = require('../../controllers/services/deleteServicesbyVendorserviceid');
const app = Router();
app.delete('/main/deleteService/:vendorServiceId', deleteservice);
module.exports = app;