const {Router} = require('express');
const delete_conn = require('../../controllers/User/deleteConnection');
const app = Router();

app.patch('/main/deleteConn/:User_id', delete_conn );
module.exports = app;