const { Router } = require('express');
const adminPosts = require('../../controllers/Admin/getAdminPosts')
const app = Router();

app.get('/main/getAdminPosts/:post_type', adminPosts);

module.exports = app;