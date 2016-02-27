var PUBLIC_DIR = __dirname + '/public_html';

var express = require('express'),
    errorHandler = require('errorhandler'),
    path = require('path'),
 //   favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var ip_map = new Map();


app.use(function (req) {
    // Здесь нужно написать журналирование в формате
    // (журналирование - вывод в консоль)
    // [время] [номер запроса по счету]
    var ip = toString(req.remoteAddress);
    var current_date = new Date();
    var value = 1;
    if ( ip_map.has(ip) ) {

        value = ip_map.get(ip);
        value+=1;
        ip_map.set(ip, value);
    }
    else {
        ip_map.set(ip, 1);
    }
    console.log("LOG:"+ current_date.toDateString() +" [ app.use: (addr: " + ip + ")" + ":" + req.url + "]: " + value );
    req.next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(require('node-compass')({mode: 'expanded'})); */
app.use('/', express.static(PUBLIC_DIR));
app.use(errorHandler());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




module.exports = app;
