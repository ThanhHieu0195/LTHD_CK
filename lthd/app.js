var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var fileUpload = require('express-fileupload');

var app = express();

app.use(fileUpload());

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router config
var api = express.Router();
require('./routes/api')(api, passport);
app.use('/api', api);

var auth = express.Router();
require('./routes/auth')(auth, passport);
app.use('/auth', auth);

var dashboard = express.Router();
require('./routes/dashboard')(dashboard, passport);
app.use('/dashboard', dashboard);

var token  = require('./routes/token');
app.use('/token', token);

var account = require('./routes/account');
app.use('/', account);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
