/**
 * Created by quang on 11/29/2016.
 */
var jwt = require('jsonwebtoken');
var connection = require('../config/sqlConnection');
var auth = require('../config/auth');

module.exports = function (router, passport) {

    router.get('/facebook',
        passport.authenticate('facebook'));

    router.get('/facebook/return',
        passport.authenticate('facebook', {failureRedirect: '/' }),
        function(req, res) {
            var data = req.session.passport.user;
            var user = new Object({
                data: 'fb.'+data.id,
                exp: Math.floor(Date.now() / 1000) + auth.bearerAuth.tokenTTL,
            });
            var token = jwt.sign(user, auth.bearerAuth.clientSecret);
            var tokenData = {
                token: token,
                type: 'Bearer',
                exp: user.exp
            }
            res.cookie('token', tokenData.type+ ' ' +tokenData.token);
            res.redirect('/dashboard');
        });
}