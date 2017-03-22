var express = require('express'),
    fs = require('fs'),
    config = require('./config'),
    path = require('path');

var body_parser = require('body-parser');

var app = express();

app.set('port', 3000);
app.set('x-powered-by', false);

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

// parse application/json
app.use(body_parser.json());

app.get('/favicon.ico', (req, res) => {

    //TODO
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