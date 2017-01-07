/**
 * Created by Administrator on 07/01/2017.
 */
var constants = require('../config/constants');
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');
var shortid = require('shortid');
module.exports = {
    register:function (req, res) {
        var account = {
            id: shortid.generate(),
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            description: req.body.description,
            level:constants.LEVEL_MEMBER,
            avata_link:constants.AVT_USER
        };

        if ( account.username == undefined || account.username == '' || account.password == undefined || account.password == ''  ) {
            res.status(400).end('data không hợp lệ');
        }
        console.log(account);
        connection.query('select count(*) num from tr_account where username = ?', account.username, function (err, result) {
            if (err) {
                res.status(400).end(err.data);
            }
            console.log(result);
            if ( result.num > 0 ) {
                res.status(400).end('user đã tồn tại');
            }
            connection.query('insert into tr_account set ?', account, function (err, result) {
                if (err) {
                    res.status(400).end(error.data);
                }
                res.status(200).render('success', {caption:'Đăng kí thành công', img_src:'', button_link:'/', button_text:'Tiếp tục'});
            });
        });
    }
};