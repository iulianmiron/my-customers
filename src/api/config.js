var DB_BASE_URL     = '127.0.0.1';
var FE_PORT         = (process.env.PORT && process.env.PORT.trim()) || '3500';
var DB_PORT         = process.env.DEV_SERVER_PORT || '27017';
var db              = DB_BASE_URL + ':' + DB_PORT.trim() + '/';

exports.FE_PORT     = FE_PORT;
exports.db          = db;

