/**
 * Created by quang on 11/28/2016.
 */
var connection = require('../config/sqlConnection');
var constants = require('../config/constants');
var mysql = require('mysql');
var jwtDecode = require('jwt-decode');
var jwt = require('jsonwebtoken');
module.exports = function (router, passport) {
    router.use(passport.authenticate(['bearer'], {session: false}));
    //newfeed
    router.get('/newfeed/?:page', function (req, res) {
        var page = req.params.page;
        if (page == undefined) {
            page = 1;
        }
        page = parseInt(page);
        page -= 1;
        var limit = constants.LIMIT_POST;
        var offset = page*limit;
        var sql = 'select * from ?? order by ?? limit ? offset ?;';
        sql = mysql.format( sql,  ['post', 'date_post', limit, offset]);
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
            res.end();
        });
    });

    //get profile
    router.get('/profile', function (req, res) {
        var authorization = req.headers.authorization;
        if ( authorization == undefined ) res.end();
        var arr  = authorization.split(' ');
        var token = arr[1];
        var decoded = jwtDecode(token);
        var now = Math.floor(Date.now() / 1000)
        decoded['timeout'] = decoded.exp - now;
        res.json(decoded).end();
    });
}