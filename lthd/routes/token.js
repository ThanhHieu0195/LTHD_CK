/**
 * Created by quang on 11/28/2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var connection = require('../config/sqlConnection');
var auth = require('../config/auth');
var passport = require('passport');

/* GET accounts listing. */
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username === undefined || password === undefined) {
        res.end('Không tìm thấy tham số username & password');
    }
    connection.query('SELECT COUNT(*) as number FROM tr_account where username=?', username, function (err, result) {
        if (err) {
            res.status(400).end('Lỗi khi kết nối database');
        } else if (result[0].number == 0) {
            res.status(400).end('Username không tồn tại');
        } else {
            connection.query('SELECT *  FROM tr_account WHERE username=? and password=?', [username, password], function (err, result) {
                if (err) {
                    res.status(400).end('Lỗi khi kết nối database');
                } else if (result.length === 0) {
                    res.status(400).end('Sai mật khẩu');
                } else {
                    var account = new Object({
                        data: result[0],
                        exp: Math.floor(Date.now() / 1000) + auth.bearerAuth.tokenTTL,
                    });
                    var token = jwt.sign(account, auth.bearerAuth.clientSecret);
                    var tokenData = {
                        token: token,
                        type: 'Bearer',
                        exp: account.exp
                    }
                    res.cookie('token', tokenData.type+ ' ' +tokenData.token);
                    console.log(tokenData);
                    res.redirect('/');
                }
            });
        }
    });
});

module.exports = router;

