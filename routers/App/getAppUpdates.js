const { Router } = require('express');
const getappUpdates = require('../../controllers/App/getAppUpdates');
const app = Router();

app.get('/main/getAppUpdate',getappUpdates);
module.exports = app;