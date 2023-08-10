const { Router } = require('express');
const getFaqs = require('../../controllers/FAQ/getFaq');

const app = Router();

// Middleware to normalize URL by replacing consecutive slashes with a single slash
app.use((req, res, next) => {
  req.url = req.url.replace(/\/{2,}/g, '/');
  next();
});

app.get('/main/getFaq', getFaqs);

module.exports = app;
