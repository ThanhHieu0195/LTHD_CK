/**
 * Created by Administrator on 10/01/2017.
 */
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');
var mysql = require('mysql');

module.exports = {
    getChat:function (req, res) {
        var authorization = req.headers.authorization;
        var id = helper.get_id_account_current(authorization);

        var sql = "select id, username, avata_link from ?? where id!= ? limit 10";
        sql = mysql.format( sql,  ['tr_account', id]);
        var list_friend = [];
        var list_chat = {};
        var query = connection.query(sql);
        query
            .on('result', function (row) {
                list_friend.push(row);
                list_chat[row.id] = [];
            })
            .on('end', function () {
                sql = 'select tr_chat.*, tr_account.avata_link avt_sender, tr_account.username sender_name ' +
                    'from tr_chat join tr_account on tr_account.id = tr_chat.sender ' +
                    'where tr_chat.sender = ? or tr_chat.receiver = ? order by id;';
                var query_chat = connection.query(sql, [id, id]);
                query_chat
                    .on('result', function (row) {
                        if (row.sender != id) {
                            list_chat[row.sender].push(row);
                        }

                        if (row.receiver != id) {
                            list_chat[row.receiver].push(row);
                        }
                    })
                    .on('end', function () {
                       res.json({list_friend:list_friend, list_chat:list_chat});
                    });
            });
    }
}