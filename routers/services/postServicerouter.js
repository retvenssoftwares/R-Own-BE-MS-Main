const { Router } = require('express');
const servicepost = require('../../controllers/services/postService');
const app = Router();
app.post('/main/postService', servicepost);
module.exports = app;