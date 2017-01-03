var path = require('path');
var jade = require('jade');
var fs = require('fs');
module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('dashboard');
    });
}