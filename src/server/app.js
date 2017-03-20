var express = require('express'),
    fs = require('fs'),
    config = require('./config'),
    path = require('path');

var body_parser = require('body-parser');

var app = express();

app.set('port', 3000);
app.set('x-powered-by', false);

app.use(body_parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/favicon.ico', (req, res) => {

    res.sendStatus(204);
});

//load all routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (e) {

    e = e.replace('.js', '');
    app.use('/' + e, require('./routes/' + e));
}, this);

// catch 404 and forward to error handler
app.use((req, res, next) => {

    var error = new Error('Not Found');
    error.status = 404;

    next(error);
});

// error handler
app.use((err, req, res, next) => {
    console.error('request url ' + req.path + ' ' + err.stack);

    if (config.env !== 'development') err.debug = undefined;

    err.status = err.status || 500;
    err.hasError = true;

    res.jsonp(err);
});

module.exports = app;