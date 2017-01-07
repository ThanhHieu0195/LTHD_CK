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
        var sql = 'select * from ?? order by ?? limit ? offset ?;';
        sql = mysql.format( sql,  ['tr_post', 'date_post', limit, offset]);
        console.log(sql);
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
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
                    data.push( helper.cloundinary.getUrl(rows[i].image) );
                }
                res.status(200).json(data);
            });
    }
};