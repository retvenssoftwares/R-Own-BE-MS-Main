const { Router } = require('express');
const updatesapps = require('../../controllers/App/updateApp');
const app = Router();

app.patch('/main/updateBuild/:update_id',updatesapps);
module.exports = app;