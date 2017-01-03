/**
 * Created by quang on 11/29/2016.
 */
var express = require('express');
var router = express.Router();
var connection = require('../config/sqlConnection');
var path = require('path');
/* GET users listing. */
router.post('/register', function (req, res, next) {
    var account = {username: req.body.username, email: req.body.email, password: req.body.password};

    /*
     validate data
     */
    if (account.username == undefined || account.username.length < 8)
        res.end({mess: 'username không hợp lệ'});
    if (account.password == undefined || account.password.length < 8)
        res.end({mess: 'password không hợp lệ'});
    if (account.email == undefined || account.email.length < 5)
        res.end({mess: 'email không hợp lệ'});

    connection.query('INSERT INTO account SET ?', account, function (err, result) {
        if (err) {
            res.status = 501;
            res.end({mess: JSON.stringify(err.data)});
        }
        res.status = 201;
        res.end({mess: 'register success'});
    });

});

router.get('/', function (req, res, next) {
    res.render('account', {title:'login'});
});

module.exports = router;