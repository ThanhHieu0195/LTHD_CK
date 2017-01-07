var express = require('express');
var router = express.Router();
var constants = require('../config/constants');
var helper = require('../config/helper');

router.post('/register', function (req, res) {
    var account = require("../models/account");
    account.register(req, res);
});

router.get('/', function (req, res, next) {
    res.render('account', {title:'login'});
});

module.exports = router;