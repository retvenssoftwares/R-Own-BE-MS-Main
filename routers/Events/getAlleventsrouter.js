const { Router } = require('express');
const getallevent = require('../../controllers/Events/getAllevent');
const app = Router();

app.get('/main/allEvent/:User_id',getallevent);
module.exports = app;