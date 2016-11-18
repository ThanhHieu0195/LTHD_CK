var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login', content:'đây là trang login' });
});

module.exports = router;
