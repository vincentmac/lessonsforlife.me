
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.use(express.favicon());
  // app.use(express.favicon(__dirname + '/app/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'app')));
  // app.use(express.static(path.join(__dirname, 'dist')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// app.get('/', routes.index);
// app.get('/', routes.index);
// app.get('test', routes.index);
// app.get('/users', user.list);

// Routes
require('./routes')(app);
require('./routes/post')(app);
require('./routes/api')(app);
require('./routes/submit')(app);
require('./routes/social')(app);
require('./routes/rss')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
