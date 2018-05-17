var express     = require('express');
var app         = express();
var path        = require('path');
var mongojs     = require('mongojs');
var bodyParser  = require('body-parser');
var logger      = require('./api/utils/logging').logger;

var secret  = require('./api/config').secret;
var PORT    = require('./api/config').FE_PORT;
var db      = require('./api/config').db;

var clients         = require('./api/routes/clients');
var history         = require('./api/routes/history');
var appointments    = require('./api/routes/appointments');
var services        = require('./api/routes/services');
var service_types   = require('./api/routes/service-types');
var products        = require('./api/routes/products');
var consumables     = require('./api/routes/consumables');
var staff           = require('./api/routes/staff');
var roles           = require('./api/routes/roles');
var users           = require('./api/routes/users');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(logger);
app.set('superSecret', secret);

// CLIENTS collection
app.get('/api/clients', clients.getAll);
app.get('/api/clients/:id', clients.getOne);
app.get('/api/clients/search/:query', clients.search);
app.post('/api/clients', clients.add);
app.put('/api/clients/:id', clients.update);
app.delete('/api/clients/:id', clients.delete);

// HISTORY collection
app.get('/api/history', history.getAll);
app.get('/api/history/client/:id', history.getClientHistory);
app.post('/api/history', history.add);
app.put('/api/history/:id', history.update);
app.delete('/api/history/:id', history.delete);

// APPOINTMENTS collection
app.get('/api/appointments/search/:query', appointments.search);
app.get('/api/appointments', appointments.getAll);
app.get('/api/appointments/date/:date', appointments.getAllByDate);
app.get('/api/appointments/client/:id', appointments.getClientAppointments);
app.post('/api/appointments', appointments.add);
app.put('/api/appointments/:id', appointments.update);
app.delete('/api/appointments/:id', appointments.delete);

// SERVICES collection
app.get('/api/services', services.getAll);
app.post('/api/services', services.add);
app.put('/api/services/:id', services.update);
app.delete('/api/services/:id', services.delete);

// SERVICE TYPES collection
app.get('/api/service-types', service_types.getAll);
app.get('/api/service-types/:id', service_types.getOne);
app.post('/api/service-types', service_types.add);
app.put('/api/service-types/:id', service_types.update);
app.delete('/api/service-types/:id', service_types.delete);

// PRODUCTS collection
app.get('/api/products', products.getAll);
app.post('/api/products', products.add);
app.put('/api/products/:id', products.update);
app.delete('/api/products/:id', products.delete);

// Consumables collection
app.get('/api/consumables', consumables.getAll);
app.post('/api/consumables', consumables.add);
app.put('/api/consumables/:id', consumables.update);
app.delete('/api/consumables/:id', consumables.delete);

// STAFF collection
app.get('/api/staff/search/:query', staff.search);
app.get('/api/staff', staff.getAll);
app.get('/api/staff/:id', staff.getOne);
app.post('/api/staff', staff.add);
app.put('/api/staff/:id', staff.update);
app.delete('/api/staff/:id', staff.delete);

// ROLES collection
app.get('/api/roles/search/:query', roles.search);
app.get('/api/roles', roles.getAll);
app.post('/api/roles', roles.add);
app.put('/api/roles/:id', roles.update);
app.delete('/api/roles/:id', roles.delete);

// USERS collection
app.post('/api/users/register', users.register);
app.post('/api/users/login', users.login);
app.post('/api/users/logout', users.logout);
app.get('/api/users', users.getAll);
app.get('/api/users/:id', users.getOne);
app.get('/api/users/search/:query', users.search);
app.post('/api/users', users.add);
app.put('/api/users/:id', users.update);
app.delete('/api/users/:id', users.delete);

// kill server
app.get('/api/stop', function(req, res) {
    console.info("\n┌─────────────────────────────┐");
    console.info(  "│ ESTET STUDIO APP -> STOPPED │");
    console.info(  "└─────────────────────────────┘\n");

	setTimeout(() => process.exit(), 500);
});

// necessary to redirect all routes that Node is not using to Angular, always add last
app.get('*', function(req, res) {
    res.sendFile(path.resolve('./index.html'));
});

app.listen(PORT, function() {
    console.info("\n┌─────────────────────────────┐");
    console.info(  "│ ESTET STUDIO APP -> STARTED │");
    console.info(  "└─────────────────────────────┘\n");
    console.info("DO NOT CLOSE THIS WINDOW!");
    console.info("SERVER address: ", db);
    console.info("APP port: ", PORT);
});