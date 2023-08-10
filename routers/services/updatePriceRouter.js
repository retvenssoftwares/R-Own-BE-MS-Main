const { Router } = require('express');
const updateprice = require('../../controllers/services/updatePrice');
const app = Router();
app.patch('/main/updatePrice/:vendorServiceId', updateprice);
module.exports = app;