'use strict';

var _ = require('lodash');

var config = {
    env: process.env.NODE_ENV || 'development',
    mongodb: 'mongodb://182.92.234.116:9990/sign-in'
};

module.exports = _.merge(config, require('./' + config.env) || {});