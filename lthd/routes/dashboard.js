var path = require('path');
var cookieParser = require('cookie-parser');
module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('dashboard');
    });

    router.get('/profile', function (req, res) {
        res.render('profile');
    });

    router.get('/message/:receiver', function (req, res) {
        var receiver = req.params.receiver;
        res.render('message', {title:'Message', receiver:receiver});
    });

}