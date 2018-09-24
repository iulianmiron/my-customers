var ip = require('ip');

var DB_BASE_URL     = ip.address();
var DB_PORT         = process.env.DEV_SERVER_PORT || '27017';

function setupCORS(req, res, next) {
    // Instead of "*" you should enable only specific origins
    res.header('Access-Control-Allow-Origin', '*');
    // Supported HTTP verbs
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Other custom headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

module.exports = {
	FE_PORT: (process.env.PORT && process.env.PORT.trim()) || '3500',
	db: DB_BASE_URL + ':' + DB_PORT.trim() + '/',
	CORS: setupCORS
};

