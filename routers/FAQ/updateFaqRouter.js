const{Router}=require('express');

const updateFaqs=require('../../controllers/FAQ/updateFaq');

const app=Router();
app.patch('/main/updateFaq/:faqId',updateFaqs);

module.exports = app;