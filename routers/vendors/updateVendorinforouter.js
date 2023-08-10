const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const vendor = require('../../controllers/vendors/updateVendorinfo');
const app = Router();

app.patch('/main/vendor/:User_id',vendor);
module.exports = app;
