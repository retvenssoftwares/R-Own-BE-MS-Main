const {Router} = require('express');
const block = require('../../controllers/User/blockUser');
const app = Router();

app.patch('/main/block/:User_id', block );
module.exports = app;