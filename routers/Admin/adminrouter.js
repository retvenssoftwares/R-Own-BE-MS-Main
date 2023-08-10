const { Router } = require('express');
const admin = require('../../controllers/Admin/admincontroller')
const app = Router();

app.post('/main/login', admin);

module.exports = app;