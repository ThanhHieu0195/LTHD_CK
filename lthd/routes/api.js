/**
 * Created by quang on 11/28/2016.
 */

module.exports = function (router, passport) {

    router.use(passport.authenticate(['bearer'], {session: false}));

    router.get('/', function (req, res) {
        console.log(req.user);
        res.json({SecretData: 'abc123'});
    });
}