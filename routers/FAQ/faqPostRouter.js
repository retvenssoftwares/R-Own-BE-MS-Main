const{Router}=require('express');
const Faqs=require('../../controllers/FAQ/faqPost');

const app=Router();
app.post('/main/postFaq',Faqs);

module.exports = app;
