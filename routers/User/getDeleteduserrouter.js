const {Router} = require('express');
const getdeletacc = require('../../controllers/User/getDeleteduser');
const app = Router();

app.get('/main/getDeletedData', getdeletacc);
module.exports = app;