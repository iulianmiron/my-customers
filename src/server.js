var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var db_clients = mongojs(db + 'clients', ['clients', 'history']);
var db_services = mongojs(db + 'services', ['services', 'types']);
var db_products = mongojs(db + 'products', ['products']);
var db_consumables = mongojs(db + 'consumables', ['consumables']);


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

////////////////// CLIENTS Collection /////////////////////////
//Get all clients in clients collection
app.get('/clients', function(req, res) {
    db_clients.clients.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/clients/search/:query', function(req, res) {
    console.log("find client with id", req.params.query);
    db_clients.clients.find({ $text: { $search: req.params.query } }, function(err, doc) {
        console.log("find clients response", doc);
        res.json(doc);
    });
});

//Add clients in clients collection
app.post('/clients', function(req, res) {
    console.log('----------------------------------------');
    console.log('add client with', req.body);
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.clients.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Find client by id
app.get('/clients/:id', function(req, res) {
    db_clients.clients.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update client in db_clients
app.put('/clients/:id', function(req, res) {
    console.log("update client with id", req.params.id);
    console.log("update client with data", req.body);
    var updatedOn = new Date();

    db_clients.clients.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                skinType: req.body.skinType,
                previousMedicalConditions: req.body.previousMedicalConditions,
                previousTreatments: req.body.previousTreatments,
                skinCareProductsUsed: req.body.skinCareProductsUsed,
                discovery: req.body.discovery,
                history: req.body.history,
                isVip: req.body.isVip,
                vip: req.body.vip,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/clients/:id', function(req, res) {
    db_clients.clients.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});

/////////////////// HISTORY collection /////////////////////////////////////
//Get all history in history collection
app.get('/history', function(req, res) {
    db_clients.history.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/history/client/:id', function(req, res) {
    db_clients.history.find({ "_clientId": req.params.id }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/history', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.history.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});

//Update history item in db_clients
app.put('/history/:id', function(req, res) {
    console.log("update history with id", req.params.id);
    console.log("update history with data", req.body);
    var updatedOn = new Date();

    db_clients.history.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                date: req.body.date,
                servicesPerformedBy: req.body.servicesPerformedBy,
                services: req.body.services,
                interval: req.body.interval,
                homeProducts: req.body.homeProducts,
                observations: req.body.observations,
                _clientId: req.body._clientId,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

//////////////////// SERVICES collection //////////////////
//Add services in services collection
app.post('/services', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.services.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all services in services collection
app.get('/services', function(req, res) {
    db_services.services.find(function(err, docs) {
        res.json(docs);
    });
});

//Update client in db_clients
app.put('/services/:id', function(req, res) {
    console.log("update services with id", req.params.id);
    console.log("update services with data", req.body);
    var updatedOn = new Date();

    db_services.services.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                name: req.body.name,
                price: req.body.price,
                duration: req.body.duration,
                _serviceTypeId: req.body._serviceTypeId,
                isProtected: req.body.isProtected,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

app.delete('/services/:id', function(req, res) {
    db_services.services.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});

//////////////////// SERVICE TYPES collection //////////////////
//Add service type
app.post('/service-types', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.types.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all service type
app.get('/service-types', function(req, res) {
    db_services.types.find(function(err, docs) {
        res.json(docs);
    });
});

//Update service type
app.put('/service-types/:id', function(req, res) {
    console.log("update service type with id", req.params.id);
    console.log("update service type with data", req.body);
    var updatedOn = new Date();

    db_services.types.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                name: req.body.name,
                isProtected: req.body.isProtected,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

//delete service type
app.delete('/service-types/:id', function(req, res) {
    db_services.types.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});


//////////////////// PRODUCTS collection //////////////////
//Add products in products collection
app.post('/products', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_products.products.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all services in services collection
app.get('/products', function(req, res) {
    db_products.products.find(function(err, docs) {
        res.json(docs);
    });
});

//Delete a specific product
app.delete('/products/:id', function(req, res) {
    db_products.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update product in db_products
app.put('/products/:id', function(req, res) {
    console.log("update product with id", req.params.id);
    console.log("update product with data", req.body);
    var updatedOn = new Date();

    db_products.products.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                codeCashRegister: req.body.codeCashRegister,
                code: req.body.code,
                manufacturer: req.body.manufacturer,
                name: req.body.name,
                range: req.body.range,
                description: req.body.description,
                volume: req.body.volume,
                stock: req.body.stock,
                priceInitial: req.body.priceInitial,
                priceToSell: req.body.priceToSell,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

//////////////////// Consumables collection //////////////////
//Add consumables in consumables collection
app.post('/consumables', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_consumables.consumables.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all consumables in consumables collection
app.get('/consumables', function(req, res) {
    db_consumables.consumables.find(function(err, docs) {
        res.json(docs);
    });
});

//Delete a specific consumable
app.delete('/consumables/:id', function(req, res) {
    db_consumables.consumables.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update consumable in db_consumables
app.put('/consumables/:id', function(req, res) {
    console.log("update consumable with id", req.params.id);
    console.log("update consumable with data", req.body);
    var updatedOn = new Date();

    db_consumables.consumables.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                manufacturer: req.body.manufacturer,
                name: req.body.name,
                range: req.body.range,
                description: req.body.description,
                volume: req.body.volume,
                price: req.body.price,
                updatedOn: updatedOn,
                createdOn: req.body.createdOn
            }
        },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});


//kill server
app.get('/kill', function(req, res) {
	setTimeout(() => process.exit(), 500);
});


app.listen(PORT, function() {
    console.log("DO NOT CLOSE THIS WINDOW!");
    console.log("server running on address: ", db);
    console.log("app running on port: ", PORT);
});