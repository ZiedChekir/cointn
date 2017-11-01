//Dependencies
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHbs  = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
// --------------ROUTES--------------------

const index = require('./routes/index');
const prizes = require('./routes/prizes');
const earncoins = require('./routes/earncoins');
const invite = require('./routes/invite');
const profile = require('./routes/profile');

//-----------------BEGIN-----------------
var app = express();
require('./config/passport');
mongoose.createConnection('localhost:27017/ebonus');
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'shhhhhhhhh',
    resave: true,
    saveUninitialized: true
  })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//------------REq VARIABLES-------------------------
app.use(function(req, res, next) {
  res.locals.logged = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.logged = true;
    res.locals.user = req.user;
  }
  next();

});


//----------------SET ROUTES----------------
app.use('/', index);
app.use('/prizes', prizes);
app.use('/earncoins',earncoins);//
app.use('/invite',invite);
app.use('/profile',profile);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
