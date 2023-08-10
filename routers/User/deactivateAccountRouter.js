const {Router} = require('express');
const delete_acco = require('../../controllers/User/deactivateAccount');
const app = Router();

app.patch('/main/deactivateAcc', delete_acco );
module.exports = app;