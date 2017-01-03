module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('check_timeout');
    });
    router.use(passport.authenticate(['bearer'], {session: false}));
    router.get('/:username', function (req, res) {
        res.render('dashboard', {title:req.params.username});
    });
}