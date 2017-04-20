import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cookieParser from 'cookie-parser'; // this module doesn't use the ES6 default export yet
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
var db = require('./db');

import * as Carataker from './model/caretaker';

//Views
import index  from './routes/index';
import api   from './routes/api';
import users  from './routes/users';
import rooms  from './routes/rooms';
import alerts from './routes/alerts';

const app: express.Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('combined'));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(
  function(username, password, cb) {
    let caretaker = Carataker.getCaretakerByName(username).then((row) => {
      if(!caretaker) { return cb(null, false); }
      if(caretaker.Password != password) { return cb(null, false); }
      if(row) { return cb(null, username); }
    });
  })
);

//passport.use(new passportLocal.Strategy(
//  function(username, password, cb) {
//    db.users.findByUsername(username, function(err, user) {
//      if (err) { return cb(err); }
//      if (!user) { return cb(null, false); }
//      if (user.password != password) { return cb(null, false); }
//      return cb(null, user);
//    });
//  }));



// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  console.log('hogeeeeeeeeee');
  cb(null, user.Id);
});

passport.deserializeUser(function(id, cb) {
  console.log('piyooooooooooooooo');

  Carataker.getCaretakerById(id).then( (row) => {
    if (!row) { return cb(null); }
    cb(null, row)
  });
});

app.use('/', index);
app.use('/api', api);
app.use('/users', users);
app.use('/rooms', rooms);
app.use('/alerts', alerts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.render('error', {
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
  res.render('error', {
    message: error.message,
    error: {}
  });
  return null;
});

export default app;
