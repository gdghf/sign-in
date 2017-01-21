var express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    bodyParser = require('body-parser');

mongoose.connect(config.mongodb);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected!')
});

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('port', 3000);
app.set('x-powered-by', false);

//load all routes
fs.readdirSync('./routes').forEach(function (e) {

    e = e.replace('.js', '');
    app.use('/' + e, require('./routes/' + e));
}, this);

app.listen(app.get('port'), function () {

    console.log("Server listening on: http://localhost:%s", 3000);
});

module.exports = app;