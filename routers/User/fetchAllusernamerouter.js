const {Router} =require('express');
const getusername=require('../../controllers/User/fetchAllusername')
const app =Router();
app.get('/main/getUsername',getusername);
module.exports=app;