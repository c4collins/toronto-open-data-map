var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'City of Toronto Open Data' });
});
router.get('/about', function(req, res) {
  res.render('about', { title: 'City of Toronto Open Data' });
});
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'City of Toronto Open Data' });
});

module.exports = router;
