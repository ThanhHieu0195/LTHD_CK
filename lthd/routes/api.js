/**
 * Created by quang on 11/28/2016.
 */
var connection = require('../config/sqlConnection');
var constants = require('../config/constants');
var mysql = require('mysql');
var helper = require("../config/helper");

module.exports = function (router, passport) {
    router.use(passport.authenticate(['bearer'], {session: false}));

    router.get('/', function (req, res) {
        var authorization = req.headers.authorization;
        var profile = helper.decoded_token(authorization);
        var data = {};
        data.profile = profile;
        res.status(200).jsonp(data);
    });

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
    router.get('/profile/basic', function (req, res) {
        var authorization = req.headers.authorization;
        var decoded = helper.decoded_token(authorization);
        res.status(200).json(decoded);
    });
}