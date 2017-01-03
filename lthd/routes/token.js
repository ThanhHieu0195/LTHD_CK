/**
 * Created by quang on 11/28/2016.
 */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var connection = require('../config/sqlConnection');
var auth = require('../config/auth');
var passport = require('passport');

/* GET users listing. */
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username === undefined || password === undefined) {
        res.end('Không tìm thấy tham số username & password');
    }
    connection.query('SELECT COUNT(*) as number FROM account where username=?', username, function (err, result) {
        if (err) {
            res.end('Lỗi khi kết nối database');
        } else if (result[0].number == 0) {
            res.end('Username không tồn tại');
        } else {
            connection.query('SELECT username, password, email  FROM account WHERE username=? and password=?', [username, password], function (err, result) {
                if (err) {
                    res.end('Lỗi khi kết nối database');
                } else if (result.length === 0) {
                    res.end('Sai mật khẩu');
                } else {
                    var user = new Object({
                        data: result[0],
                        exp: Math.floor(Date.now() / 1000) + auth.bearerAuth.tokenTTL,
                    });
                    var token = jwt.sign(user, auth.bearerAuth.clientSecret);
                    var tokenData = {
                        token: token,
                        type: 'Bearer',
                        exp: user.exp
                    }
                    res.json(tokenData);
                }
            });
        }
    });
});

module.exports = router;

