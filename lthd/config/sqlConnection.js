/**
 * Created by quang on 11/28/2016.
 */
var mysql = require('mysql');
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trumpstagram'
});
