var express     = require('express');        // call express
var app         = express();                 // define our app using express
var path = require('path');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var routes = require('./routes/index');
var port = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(cookieParser());
//app.use(logger('dev'));
//app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

//Error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);