var winston = require('winston');
var {Loggly} = require('winston-loggly-bulk');

winston.add(new Loggly({
    token: process.env.winston_token,
    subdomain: process.env.subdomain,
    tags: ["Winston-NodeJS"],
    json: true
}));

winston.log('info', "winston started /logger.js");
module.exports = winston;