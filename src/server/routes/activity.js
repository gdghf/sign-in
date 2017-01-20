var express = require('express'),
    router = express.Router();

const util = require('util');

router.get('/', function (req, res) {
    res.send('activity');
});

module.exports = router;