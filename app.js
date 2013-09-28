
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(flash());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    secret:settings.cookieSecret,
    store: new MongoStore({
        db: settings.db
    })
}));

//放在 app.use(app.router);前面，否则无效
app.use(function(req, res, next) {
    res.locals.error = req.flash('error').toString();
    res.locals.success = req.flash('success').toString();
    res.locals.user = req.session ? req.session.user : null;
    next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
