const {Router} = require('express');
const contact = require('../../controllers/User/checkContactsSynched');
const app = Router();

app.post('/main/checkContacts', contact);
module.exports = app;