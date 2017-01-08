/**
 * Created by Administrator on 04/01/2017.
 */

var constants = require('../config/constants');
var helper = require('../config/helper');
var cloudinary = require('cloudinary');
cloudinary.config(constants.CLOUDINARY_CONFIG);

module.exports = {
    decoded_token : function (authorization) {
        var jwtDecode = require('jwt-decode');
        if ( authorization == undefined ) res.end();
        var arr  = authorization.split(' ');
        var token = arr[1];
        var decoded = jwtDecode(token);
        var now = Math.floor(Date.now() / 1000)
        decoded['timeout'] = decoded.exp - now;
        return decoded;
    },
    get_current_time: function (format) {
        var date 	= new Date();
        var year 	= date.getFullYear();
        var month 	= date.getMonth()+1;
        var day 	= date.getDate();
        var hours 	= date.getHours();
        var minutes	= date.getMinutes();
        var seconds= date.getSeconds();
        var fm   	= '';
       if (format == undefined) {
           fm = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
       }
        return fm;
    },
    get_id_account_current:function (authorization) {
        var jwtDecode = require('jwt-decode');
        if ( authorization == undefined ) res.end();
        var arr  = authorization.split(' ');
        var token = arr[1];
        var decoded = jwtDecode(token);
        var now = Math.floor(Date.now() / 1000)
        decoded['timeout'] = decoded.exp - now;
        return decoded.data.id;
    },
    cloundinary:{
        getUrl:function (public_id) {
          return cloudinary.url(public_id);
        },
        upload:function (req, res) {
            var myImage;
            if (!req.files) {
                res.send('No files were uploaded.');
            }
            myImage = req.files.myImage;
            var path = 'uploads/'+myImage.name;
            myImage.mv(path, function(err) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    cloudinary.uploader.upload(path, function(result) {
                        var post = require("../models/post");
                        req.body.image = result.url;
                        console.log(req.body)
                        post.insert(req, res);
                    });
                }
            });
        }
    }
};
