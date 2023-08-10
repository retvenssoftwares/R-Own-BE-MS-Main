const {Router} = require('express');
const delete_acco = require('../../controllers/User/deletAccount');
const app = Router();

app.patch('/main/deleteAcc', delete_acco );
module.exports = app;