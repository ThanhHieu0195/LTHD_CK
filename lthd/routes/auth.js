/**
 * Created by quang on 11/29/2016.
 */

module.exports = function (router, passport) {

    router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/api',
            failureRedirect: '/'
        }));
}