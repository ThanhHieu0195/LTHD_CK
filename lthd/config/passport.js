/**
 * Created by quang on 11/28/2016.
 */
var BearerStrategy = require('passport-http-bearer').Strategy;

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

    /*
     passport.use(new GoogleStrategy({
     clientID: configAuth.googleAuth.consumerKey,
     clientSecret: configAuth.googleAuth.consumerSecret,
     callbackURL: configAuth.googleAuth.callbackURL,
     passReqToCallback: true
     },
     function (req, accessToken, refreshToken, profile, done) {
     console.log(profile);
     var newUser = new Object();
     newUser.facebook.id = profile.id;
     newUser.facebook.token = accessToken;
     newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
     newUser.facebook.email = profile.emails[0].value;
     return done(null, newUser);
     }));

     passport.use(new FacebookStrategy({
     clientID: configAuth.facebookAuth.clientID,
     clientSecret: configAuth.facebookAuth.clientSecret,
     callbackURL: configAuth.facebookAuth.callbackURL,
     passReqToCallback: true
     },
     function (req, accessToken, refreshToken, profile, done) {
     process.nextTick( function() {
     //user is not logged in yet
     User.findOne({'id': profile.id}, function (err, user) {
     var newUser = new Object();
     newUser.id = profile.id;
     newUser.token = accessToken;
     newUser.name = profile.displayName;
     newUser.email = profile.username;

     req.user = newUser;
     return done(null, newUser);
     });
     });
     }));
     */
}