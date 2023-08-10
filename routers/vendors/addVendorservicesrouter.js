const { Router } = require('express');
const newservice = require('../../controllers/vendors/pushVendorservices');
const app = Router();

app.patch('/main/vendorservice/:user_id',newservice);
module.exports = app;