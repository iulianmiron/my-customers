var express = require('express');
var path = require('path');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var db_clients      = mongojs(db + 'clients', ['clients', 'history']);
var db_services     = mongojs(db + 'services', ['services', 'types']);
var db_products     = mongojs(db + 'products', ['products']);
var db_consumables  = mongojs(db + 'consumables', ['consumables']);
var db_staff        = mongojs(db + 'staff', ['staff']);


app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());


////////////////// CLIENTS Collection /////////////////////////
//Get all clients in clients collection
app.get('/api/clients', function(req, res) {
    db_clients.clients.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/api/clients/search/:query', function(req, res) {
    console.log("Searching clients with query: ", req.params.query);

    db_clients.clients.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        console.log("search clients response:\n", doc);
        res.json(doc);
    });

});

//Add clients in clients collection
app.post('/api/clients', function(req, res) {
    console.log('----------------------------------------');
    console.log('add client with', req.body);
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.clients.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Find client by id
app.get('/api/clients/:id', function(req, res) {
    db_clients.clients.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update client in db_clients
app.put('/api/clients/:id', function(req, res) {
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

app.delete('/api/clients/:id', function(req, res) {
    db_clients.clients.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});

/////////////////// HISTORY collection /////////////////////////////////////
//Get all history in history collection
app.get('/api/history', function(req, res) {
    db_clients.history.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/api/history/client/:id', function(req, res) {
    db_clients.history.find({ "_clientId": req.params.id }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/api/history', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.history.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});

//Update history item in db_clients
app.put('/api/history/:id', function(req, res) {
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
                photosTaken: req.body.photosTaken,
                videosTaken: req.body.videosTaken,
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
app.post('/api/services', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.services.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all services in services collection
app.get('/api/services', function(req, res) {
    db_services.services.find(function(err, docs) {
        res.json(docs);
    });
});

//Update client in db_clients
app.put('/api/services/:id', function(req, res) {
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

app.delete('/api/services/:id', function(req, res) {
    db_services.services.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});

//////////////////// SERVICE TYPES collection //////////////////
//Add service type
app.post('/api/service-types', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.types.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all service type
app.get('/api/service-types', function(req, res) {
    db_services.types.find(function(err, docs) {
        res.json(docs);
    });
});

//Update service type
app.put('/api/service-types/:id', function(req, res) {
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
app.delete('/api/service-types/:id', function(req, res) {
    db_services.types.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });

});


//////////////////// PRODUCTS collection //////////////////
//Add products in products collection
app.post('/api/products', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_products.products.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all services in services collection
app.get('/api/products', function(req, res) {
    db_products.products.find(function(err, docs) {
        res.json(docs);
    });
});

//Delete a specific product
app.delete('/api/products/:id', function(req, res) {
    db_products.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update product in db_products
app.put('/api/products/:id', function(req, res) {
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
app.post('/api/consumables', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_consumables.consumables.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all consumables in consumables collection
app.get('/api/consumables', function(req, res) {
    db_consumables.consumables.find(function(err, docs) {
        res.json(docs);
    });
});

//Delete a specific consumable
app.delete('/api/consumables/:id', function(req, res) {
    db_consumables.consumables.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update consumable in db_consumables
app.put('/api/consumables/:id', function(req, res) {
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


//////////////////// STAFF collection //////////////////
//Search staff in staff collection
app.get('/api/staff/search/:query', function(req, res) {
    console.log("Searching staff with query: ", req.params.query);

    db_staff.staff.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        console.log("search staff response:\n", doc);
        res.json(doc);
    });

});

//Add staff in staff collection
app.post('/api/staff', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_staff.staff.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all staff in staff collection
app.get('/api/staff', function(req, res) {
    db_staff.staff.find(function(err, docs) {
        res.json(docs);
    });
});

//Delete a specific staff
app.delete('/api/staff/:id', function(req, res) {
    db_staff.staff.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        res.json(doc);
    });
});

//Update staff in db_staff
app.put('/api/staff/:id', function(req, res) {
    console.log("update staff with id", req.params.id);
    console.log("update staff with data", req.body);
    var updatedOn = new Date();

    db_staff.staff.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                description: req.body.description,
                email: req.body.email,
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