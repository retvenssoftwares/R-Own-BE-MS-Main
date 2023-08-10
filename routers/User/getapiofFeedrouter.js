const {Router} = require('express');
const feeddata = require('../../controllers/User/getapiofFeed');
const app = Router();

app.get('/main/myConnectionsPost/:User_id', feeddata);
module.exports = app;