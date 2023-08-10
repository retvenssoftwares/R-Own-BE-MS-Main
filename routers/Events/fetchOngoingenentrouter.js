const { Router } = require('express');
const getongoing = require('../../controllers/Events/fetchOngoingevent');
const app = Router();

app.get('/main/ongoingEvent',getongoing);
module.exports = app;