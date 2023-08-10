const { Router } = require('express');
const getservice = require('../../controllers/services/getServicename');
const app = Router();

app.get('/main/getServiceName',getservice);
module.exports = app;