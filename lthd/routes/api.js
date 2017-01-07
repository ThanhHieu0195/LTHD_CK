/**
 * Created by quang on 11/28/2016.
 */
var constants = require('../config/constants');
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');

module.exports = function (router, passport) {
    router.use(passport.authenticate(['bearer'], {session: false}));

    router.get('/', function (req, res) {
        var authorization = req.headers.authorization;
        var profile = helper.decoded_token(authorization);
        if (profile.data.provider == undefined)
            profile.data.avata_link = helper.cloundinary.getUrl(profile.data.avata_link);
        var data = {};
        data.profile = profile;
        res.status(200).jsonp(data);
    });

    // newfeed
    router.get('/newfeed/totalpost/', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.totalpost(req, res);
    });

    router.get('/newfeed/?:page', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.getNewData(req, res);
    });

    router.get('/newfeed/photos/:page', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.photos(req, res);
    });

    // profile
    router.get('/profile', function (req, res) {
        var authorization = req.headers.authorization;
        var decoded = helper.decoded_token(authorization);
        res.status(200).json(decoded);
    });

    //comment
    router.post('/comment', function (req, res) {
        var comment = require("../models/comment");
        comment.insert(req, res);
    });

    router.get('/comment/totalpost', function (req, res) {
        var newfeed = require("../models/comment");
        newfeed.totalpost(req, res);
    });

    router.get('/comment/:post_id', function (req, res) {
        var comment = require("../models/comment");
        var post_id = req.params.post_id;
        comment.getCommentByPostId(post_id, res);
    });
}