const { Router } = require('express');
const newuser = require('../../controllers/vendors/getVendorinfo');
const app = Router();
app.get('/main/vendorInfo/:User_id/:conn_user_id', newuser);
module.exports = app;
