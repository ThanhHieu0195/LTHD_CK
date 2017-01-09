/**
 * Created by Administrator on 07/01/2017.
 */
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');
var mysql = require('mysql');
module.exports = {
    getTopComment: function (res) {
        var sql = 'select count(tr_comment.id) num, comment_by, tr_account.username commenter, tr_account.avata_link avt_commenter ' +
            'from tr_comment left join tr_account on tr_account.id = comment_by ' +
            'group by comment_by order by num desc limit 10;';
        console.log(sql);
        connection.query(sql, function (err, rows, fields) {
            if (err) {
                res.status(400).end('Thực hiện truy vấn ở bảng tr_comment bị lỗi');
            }
            res.status(200).json(rows);
        });
    },
    del:function (id, res) {
        connection.query('DELETE FROM tr_comment WHERE id = ?', id, function (err, result) {
            if (err) {
                res.status(400).end('Thực hiện truy vấn ở bảng tr_comment bị lỗi');
            }
            res.status(200).end('Thao tác thành công');
        });
    },
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