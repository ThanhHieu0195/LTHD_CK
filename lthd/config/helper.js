/**
 * Created by Administrator on 04/01/2017.
 */
module.exports = {
    'decoded_token' : function (authorization) {
        var jwtDecode = require('jwt-decode');
        if ( authorization == undefined ) res.end();
        var arr  = authorization.split(' ');
        var token = arr[1];
        var decoded = jwtDecode(token);
        var now = Math.floor(Date.now() / 1000)
        decoded['timeout'] = decoded.exp - now;
        return decoded;
    }
};
