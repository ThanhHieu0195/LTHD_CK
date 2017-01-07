/**
 * Created by Administrator on 07/01/2017.
 */
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');
var mysql = require('mysql');
module.exports = {
    insert:function (req, res) {
        var data = req.body;
        data.authorization = req.headers.authorization;
        var result = {status:201, msg:'', data:{}};
        var post_id = data.post_id;
        var comment_by = helper.get_id_account_current(data.authorization);
        var date_comment = helper.get_current_time();
        var content = data.content;
        var icomment = {post_id:post_id, comment_by:comment_by, date_comment:date_comment, content:content};
        if ( icomment.post_id == '' || icomment.content == '' ) {
            res.status(400).end('Dữ liệu không hợp lệ');
        }
        connection.query('insert into tr_comment set ?', icomment, function (err, result) {
            if (err) {
                res.status(400).end('Thực hiện truy vấn ở bảng tr_comment bị lỗi');
            }
            var sql = "select * from ?? where post_id=? and comment_by=? and date_comment=?;";
            sql = mysql.format( sql,  ['tr_comment', icomment.post_id, icomment.comment_by, icomment.date_comment]);
            connection.query(sql, function (err, rows, fields) {
                console.log(sql);
                res.status(200).json(rows);
            });
        });
    },
    getCommentByPostId:function (post_id, res) {
        if (post_id == undefined) {
            res.status(400).end();
        }
        var sql = "select * from ?? where post_id=?";
        sql = mysql.format( sql,  ['tr_comment', post_id]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows);
        });
    },
    totalpost: function (req, res) {
        var authorization = req.headers.authorization;
        var post_by = helper.get_id_account_current(authorization);
        var sql = "select count(*) num from ?? where comment_by=?";
        sql = mysql.format( sql,  ['tr_comment', post_by]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows[0].num);
        });
    }
};