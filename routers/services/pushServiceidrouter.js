const { Router } = require('express');
const serviceid = require('../../controllers/services/pushServiceid');
const app = Router();

app.patch('/main/patchServiceId/:User_id',serviceid);
module.exports = app;