const {Router} =require('express');
const userlist=require('../../controllers/User/fetchBlockUserList')
const app =Router();
app.get('/main/userList/:User_id',userlist);
module.exports=app;