var DB_BASE_URL     = '127.0.0.1';
var DB_PORT         = process.env.DEV_SERVER_PORT || '27017';

// TODO change secret to environment variable
module.exports = {
	FE_PORT: (process.env.PORT && process.env.PORT.trim()) || '3500',
	db: DB_BASE_URL + ':' + DB_PORT.trim() + '/',
	secret: 'my-secret'
};

