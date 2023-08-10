const {Router} =require('express');
const userInfo=require('../../controllers/User/shareProfile')
const app =Router();
app.get('/main/userInfo/:user_id',userInfo);
module.exports=app;