
const { Router } = require('express');
const vendorpost = require('../../controllers/vendors/vendorServices');
const app = Router();

app.post('/main/vendordata', vendorpost);
module.exports = app;