/**
 * Created by Administrator on 07/01/2017.
 */
var helper = require('../config/helper');
module.exports = function (router, passport) {
    router.post('/image_upload', function (req, res) {
        helper.cloundinary.upload(req, res);
    });

    router.get('/image_upload', function (req, res) {
        res.end('not process');
    });
}