"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser"); // this module doesn't use the ES6 default export yet
//Views
var index_1 = require("./routes/index");
var api_1 = require("./routes/api");
var users_1 = require("./routes/users");
var rooms_1 = require("./routes/rooms");
var alerts_1 = require("./routes/alerts");
var app = express();
// view engine setup
var templatePath = path.resolve(__dirname, '../template');
app.set('views', templatePath);
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
var staticFiles = path.resolve(__dirname, '../static/out/');
app.use(express.static(staticFiles));
app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use('/', index_1.default);
app.use('/api', api_1.default);
app.use('/users', users_1.default);
app.use('/rooms', rooms_1.default);
app.use('/alerts', alerts_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error['status'] || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error['status'] || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
    return null;
});
exports.default = app;
