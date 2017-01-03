var path = require('path');
var jade = require('jade');
var fs = require('fs');
module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('check_timeout');
    });
    router.use(passport.authenticate(['bearer'], {session: false}));
    router.get('/:username', function (req, res) {
        // res.render('dashboard', {title:req.params.username});
        // res.send('dashboard');
        var html = fs.readFileSync('./views/dashboard.jade', 'utf8');
        // console.log(html);
        res.send(html);
    });
}