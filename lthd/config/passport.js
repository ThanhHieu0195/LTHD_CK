/**
 * Created by quang on 11/28/2016.
 */
var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
var connection = require('../config/sqlConnection');
var auth = require('./auth');

module.exports = function (passport) {

    passport.use(new BearerStrategy(
        function (token, done) {
            //translate token
            jwt.verify(token, auth.bearerAuth.clientSecret, function (err, decoded) {
                if (decoded === undefined) {
                    return done(null, null); //Token over time
                } else {
                    connection.query('SELECT COUNT(*) FROM account WHERE username=? and password=?', [decoded.data.username, decoded.data.password], function (err, result) {
                        if (err || result === undefined) {
                            return done(null, null);
                        } else {
                            return done(null, decoded.data);
                        }
                    });
                }
            });
        }
    ));
    passport.use(new FacebookStrategy({
            clientID: auth.facebookAuth.clientID,
            clientSecret: auth.facebookAuth.clientSecret,
            callbackURL: auth.facebookAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, cb) {
            return cb(null, profile);

        }));


    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
}