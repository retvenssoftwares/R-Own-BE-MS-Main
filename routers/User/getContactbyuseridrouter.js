const {Router} = require('express');
const getcontact = require('../../controllers/User/getContactbyuserid');
const app = Router();

app.get('/main/contacts/:User_id', getcontact);
module.exports = app;