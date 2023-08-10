const {Router} = require('express');
const delete_request = require('../../controllers/User/deleterequest');
const app = Router();

app.patch('/main/deleteRequest/:User_id', delete_request );
module.exports = app;