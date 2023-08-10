const { Router } = require('express');
const appUpdates = require('../../controllers/App/postAppUpdates');
const app = Router();

app.post('/main/postAppUpdate',appUpdates);
module.exports = app;