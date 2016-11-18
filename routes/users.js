var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
   res.status(404).send('Sorry cant find that!')
});

module.exports = router;
