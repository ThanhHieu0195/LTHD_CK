/**
 * Created by quang on 11/28/2016.
 */
// var connection = require('../config/sqlConnection');
module.exports = function (router, passport) {
    router.use(passport.authenticate(['bearer'], {session: false}));
    router.get('/', function (req, res) {
        res.send('vo');
    });
}