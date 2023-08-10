const { Router } = require('express');
const postservice = require('../../controllers/services/servicesName');
const app = Router();

app.post('/main/serviceName',postservice);
module.exports = app;