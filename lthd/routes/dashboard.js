module.exports = function (router, passport) {
    router.get('/', function (req, res) {
        res.render('dashboard');
    });
}