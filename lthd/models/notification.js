/**
 * Created by Administrator on 07/01/2017.
 */
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');
var constants = require('../config/constants');
var mysql = require('mysql');
module.exports = {
    insert:function (req, res) {
        var data = req.body;
        data.authorization = req.headers.authorization;
        var sender = helper.get_id_account_current(data.authorization);
        var receiver = data.receiver;
        var content = data.content;
        var status = constants.STATUS_CREATE;

        iNoti = {
            sender:sender,
            receiver:receiver,
            status:status,
            content:content
        };

        if ( iNoti.sender == '' || iNoti.receiver == '' ) {
            res.status(400).end('Dữ liệu không hợp lệ');
        }
        connection.query('insert into tr_notification set ?', iNoti, function (err, result) {
            if (err) {
                res.status(400).end('Thực hiện truy vấn ở bảng tr_comment bị lỗi');
            }
            res.status(200).json(result);
        });
    },
    get:function (req, res) {
        var data = req.body;
        data.authorization = req.headers.authorization;
        var receiver = helper.get_id_account_current(data.authorization);
        if (receiver == undefined) {
            res.status(400).end();
        }
        var sql = "select tr_notification.*, tr_account.username sender_name from ?? left join tr_account on tr_account.id = sender where receiver=? and status=? order by id desc limit 10";
        sql = mysql.format( sql,  ['tr_notification', receiver, 0]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows);
        });
    },
    seem:function (req, res) {
        var data = req.body;
        data.authorization = req.headers.authorization;
        var receiver = helper.get_id_account_current(data.authorization);
        if (receiver == undefined) {
            res.status(400).end();
        }
        var sql = "update ?? set status=? where receiver=?";
        sql = mysql.format( sql,  ['tr_notification', 1, receiver]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows);
        });
    },
    count: function (req, res) {
        var authorization = req.headers.authorization;
        var receiver = helper.get_id_account_current(authorization);
        var sql = "select count(*) num from ?? where receiver=? and status=?";
        sql = mysql.format( sql,  ['tr_notification', receiver, 0]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows[0].num);
        });
    }
};