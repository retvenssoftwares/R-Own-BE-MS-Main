const { Router } = require('express');
const postsids = require('../../controllers/User/patchPostIdinConn');
const app = Router();
app.patch('/main/showPosts', postsids);
module.exports = app;