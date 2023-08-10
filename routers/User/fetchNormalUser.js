const { Router } = require('express');
const getNormalUser = require('../../controllers/User/fetchNormalUserProfile');
const app = Router();

app.get('/main/normalProfile/:user_id/:conn_user_id', getNormalUser );
module.exports = app;