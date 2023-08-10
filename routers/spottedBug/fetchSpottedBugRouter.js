const { Router } = require('express');
const spottedBug = require('../../controllers/spottedBug/fetchSpottedBug');
const app = Router();

app.get('/main/fetchBug',spottedBug);
module.exports = app;