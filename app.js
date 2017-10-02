const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

/*
For using production environment:
process.env.NODE_ENV='production';

For working with Garbage Collector use this flags:
--nouse-idle-notification --expose-gc
*/

// ROUTES
const index = require('./routes/index');

const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Folder for files routes
  app.use('/files', express.static('../files'));

  // app.use ROUTES
  app.use('/', index);

  // Use sessionStore for saving client session 
  const sessionStore = require('./libs/sessionStore');
  app.use(session({
    secret: myconfig.session.secret,
    key: myconfig.session.key,
    cookie: myconfig.session.cookie,
    store: sessionStore
  }));

  // catch 404 error, forward to error handler
  app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;
