/**
 * Created by quang on 11/29/2016.
 */
var jwt = require('jsonwebtoken');
var connection = require('../config/sqlConnection');
var auth = require('../config/auth');
var account = require('../models/account');
module.exports = function (router, passport) {

    router.get('/facebook',
        passport.authenticate('facebook'));

    router.get('/facebook/return',
        passport.authenticate('facebook', {failureRedirect: '/' }),
        function(req, res) {
            var fbdata = req.session.passport.user;
            var data = {};
            // custom data
            data.id = 'fb.'+fbdata.id;
            data.username = fbdata.displayName;
            data.avata_link = fbdata.photos[0].value;
            data.provider = fbdata.provider;

            var user = new Object({
                data: data,
                exp: Math.floor(Date.now() / 1000) + auth.bearerAuth.tokenTTL,
            });
            var token = jwt.sign(user, auth.bearerAuth.clientSecret);
            var tokenData = {
                token: token,
                type: 'Bearer',
                exp: user.exp
            }
            res.cookie('token', tokenData.type+ ' ' +tokenData.token);
            account.facebook.sign(data);
            res.redirect('/dashboard');
        });
}