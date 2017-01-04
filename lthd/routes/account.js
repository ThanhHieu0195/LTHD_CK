
var express = require('express');
var router = express.Router();
var connection = require('../config/sqlConnection');
var path = require('path');
var shortid = require('shortid');
var constants = require('../config/constants');
/* GET users listing. */
router.post('/register', function (req, res, next) {
    var account = {
        id: shortid.generate(),
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        description: req.body.description,
        level:constants.LEVEL_MEMBER
    };

    if ( account.username == undefined || account.username == '' || account.password == undefined || account.password == ''  ) {
        res.status(400).end('data không hợp lệ');
    }

    connection.query('select count(*) num from account where username = ?', account.username, function (err, result) {
        if (err) {
            res.status(400).end(err.data);
        }
        if ( result.num > 0 ) {
            res.status(400).end('user đã tồn tại');
        }
        connection.query('insert into account set ?', account, function (err, result) {
            if (err) {
                res.status(400).end(error.data);
            }
            res.status(200).render('success', {caption:'Đăng kí thành công', img_src:'', button_link:'/', button_text:'Tiếp tục'});
        });
    });

});

router.get('/', function (req, res, next) {
    res.render('account', {title:'login'});
});

module.exports = router;