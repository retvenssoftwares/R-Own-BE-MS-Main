const {Router} = require('express');
const requestsData = require('../../controllers/User/getAllRequests');
const app = Router();

app.get('/main/allRequests/:user_id', requestsData);
module.exports = app;