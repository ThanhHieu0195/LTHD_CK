/**
 * Created by Administrator on 07/01/2017.
 */
var constants = require('../config/constants');
var helper= require('../config/helper');
var connection = require('../config/sqlConnection');
var mysql = require('mysql');

module.exports = {
    getNewData:function (req, res) {
        var page = req.params.page;
        if (page == undefined) {
            page = 1;
        }
        page = parseInt(page);
        page -= 1;
        var limit = constants.LIMIT_POST;
        var offset = page*limit;
        var select = 'select tr_post.*, tr_account.username poster, tr_account.avata_link avt_poster ';
        var from = 'from ?? left join  tr_account on tr_account.id = post_by ';
        var order = 'order by ?? limit ? offset ?;';
        var sql = select + from + order;
        sql = mysql.format( sql,  ['tr_post', 'date_post', limit, offset]);
        console.log(sql);
        var query = connection.query(sql);
        var data = [];
        var arr_id = [];
        var data_comment = [];

        query
            .on('result', function (row) {
                data.push(row);
                arr_id.push(row.id);
            })
            .on('end', function () {
                // res.json(data);
                var query_comment = connection.query('select tr_comment.*, tr_account.username commenter, tr_account.avata_link avt_commenter from tr_comment left join  tr_account on tr_account.id = comment_by ' +
                    'where post_id in ('+arr_id.toString()+') group by post_id, id');
                console.log(query_comment.sql);
                query_comment
                    .on('result', function (row) {
                        if (data_comment[row.post_id] == undefined) {
                            data_comment[row.post_id] = [];
                        }
                        data_comment[row.post_id].push(row);
                    })
                    .on('end', function () {
                        res.json({data:data, data_comment:data_comment});
                    });
            });

    },
    totalpost: function (req, res) {
        var authorization = req.headers.authorization;
        var post_by = helper.get_id_account_current(authorization);
        var sql = "select count(*) num from ?? where post_by=?";
        sql = mysql.format( sql,  ['tr_post', post_by]);
        connection.query(sql, function (err, rows, fields) {
            console.log(sql);
            res.status(200).json(rows[0].num);
        });
    },
    photos: function (req, res) {
        var authorization = req.headers.authorization;
            var post_by = helper.get_id_account_current(authorization);

            var page = req.params.page;
            if (page == undefined) {
                page = 1;
            }
            page = parseInt(page);
            page -= 1;
            var limit = constants.LIMIT_POST;
            var offset = page*limit;

            var sql = "select image from ?? where post_by=? and image!=? and image is not null order by ?? limit ? offset ?;";

             sql = mysql.format( sql,  ['tr_post', post_by, '', 'date_post',limit, offset]);
            connection.query(sql, function (err, rows, fields) {
                console.log(sql);
                var data = [];
                for(var i=0; i<rows.length; i++) {
                    data.push( rows[i].image );
                }
                res.status(200).json(data);
            });
    }
};