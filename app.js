const express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser');

/*
For using production environment:
process.env.NODE_ENV='production';

For working with Garbage Collector use this flags:
--nouse-idle-notification --expose-gc
*/

// ROUTES
const index = require('./routes/index'),
      about = require('./routes/about'),
      cooperation = require('./routes/cooperation'),
      events = require('./routes/events'),
      reports = require('./routes/reports');

const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views/pages'));
  
  app.set('view engine', 'ejs'); // TODO: сюда надо засунуть vue или что-то такое... хз что))

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
  app.use('/about', about);
  app.use('/cooperation', cooperation);
  app.use('/events', events);
  app.use('/reports', reports);

  // Use sessionStore for saving client session
  // const sessionStore = require('./libs/sessionStore');
  // app.use(session({
  //   secret: myconfig.session.secret,
  //   key: myconfig.session.key,
  //   cookie: myconfig.session.cookie,
  //   store: sessionStore
  // }));

  /*
  I think here must be some custome commonMiddleware,
  but i don't know how can i build it. So i put it here.

  app.use(common.commonMiddleware);
  */

  // catch 404 error, forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;
