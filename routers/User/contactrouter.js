const {Router} = require('express');
const contact = require('../../controllers/User/contactscontroller');
const app = Router();

app.post('/main/contacts', contact);
module.exports = app;