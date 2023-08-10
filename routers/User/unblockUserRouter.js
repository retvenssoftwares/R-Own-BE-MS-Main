const {Router} = require('express');
const unblock = require('../../controllers/User/unblockUser');
const app = Router();

app.patch('/main/unblock/:User_id', unblock );
module.exports = app;