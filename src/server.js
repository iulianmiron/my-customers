var express = require('express');
var path = require('path');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var clients         = require('./apis/routes/clients');
var history         = require('./apis/routes/history');
var services        = require('./apis/routes/services');
var service_types   = require('./apis/routes/service-types');
var products        = require('./apis/routes/products');
var consumables     = require('./apis/routes/consumables');
var staff           = require('./apis/routes/staff');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

/////////////////// CLIENTS collection ///////////////////
app.get('/api/clients', clients.getAll);
app.get('/api/clients/search/:query', clients.search);
app.post('/api/clients', clients.add);
app.get('/api/clients/:id', clients.getOne);
app.put('/api/clients/:id', clients.update);
app.delete('/api/clients/:id', clients.delete);

/////////////////// HISTORY collection ///////////////////
app.get('/api/history', history.getAll);
app.get('/api/history/client/:id', history.getClientHistory);
app.post('/api/history', history.add);
app.put('/api/history/:id', history.update);
app.delete('/api/history/:id', history.delete);

//////////////////// SERVICES collection //////////////////
app.get('/api/services', services.getAll);
app.post('/api/services', services.add);
app.put('/api/services/:id', services.update);
app.delete('/api/services/:id', services.delete);

//////////////////// SERVICE TYPES collection //////////////////
app.get('/api/service-types', service_types.getAll);
app.post('/api/service-types', service_types.add);
app.put('/api/service-types/:id', service_types.update);
app.delete('/api/service-types/:id', service_types.delete);

//////////////////// PRODUCTS collection //////////////////
app.get('/api/products', products.getAll);
app.post('/api/products', products.add);
app.put('/api/products/:id', products.update);
app.delete('/api/products/:id', products.delete);

//////////////////// Consumables collection //////////////////
app.get('/api/consumables', consumables.getAll);
app.post('/api/consumables', consumables.add);
app.put('/api/consumables/:id', consumables.update);
app.delete('/api/consumables/:id', consumables.delete);

//////////////////// STAFF collection //////////////////
app.get('/api/staff/search/:query', staff.search);
app.get('/api/staff', staff.getAll);
app.post('/api/staff', staff.add);
app.delete('/api/staff/:id', staff.delete);
app.put('/api/staff/:id', staff.update);

// kill server
app.get('/api/kill', function(req, res) {
	setTimeout(() => process.exit(), 500);
});

// necessary to redirect all routes that Node is not using to Angular, always add last
app.get('*', function(req, res) {
    res.sendFile(path.resolve('./index.html'));
});

app.listen(PORT, function() {
    console.log("DO NOT CLOSE THIS WINDOW!");
    console.log("server running on address: ", db);
    console.log("app running on port: ", PORT);
});