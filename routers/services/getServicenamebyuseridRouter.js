const { Router } = require('express');
const getservice = require('../../controllers/services/getServicenameByuserid');
const app = Router();
app.get('/main/getService/:user_id', getservice);
module.exports = app;