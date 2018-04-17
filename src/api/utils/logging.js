var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var moment = require('moment');

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'});

var logDirectory = path.join(__dirname, '../../../logs');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var currentDay = moment().format('DD-MM-YYYY');

// create a rotating write stream
var accessLogStream = rfs('access-' + currentDay + '.log', 
    {
        interval: '1d', // rotate daily
        path: logDirectory
    });

// setup the logger
var setup = morgan('combined', 
    {
        stream: accessLogStream,
        skip: function (req, res) { return !req.url.startsWith("/api"); }
    });

module.exports = {
    logger: setup
};

