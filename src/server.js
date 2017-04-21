var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('clients', ['clients', 'history', 'services']);
var bodyParser = require('body-parser');
var openurl = require('openurl');

var PORT = process.env.PORT || 3500;
var LOCATION = 'http://127.0.0.1'

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

////////////////// CLIENTS Collection /////////////////////////
//Get all clients in clients collection
app.get('/clients', function(req, res) {
    db.clients.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/clients/search/:query', function(req, res) {
    console.log("find client with id", req.params.query);
    db.clients.find({ $text: { $search: req.params.query}}, function(err, doc) {
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

    db.clients.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Find client by id
app.get('/clients/:id', function(req, res) {
    db.clients.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, doc) {
        res.json(doc);
    });
});

//Update client in db
app.put('/clients/:id', function(req, res) {
    console.log("update client with id", req.params.id);
    console.log("update client with data", req.body);
    var updatedOn = new Date();

    db.clients.findAndModify({
        query: {_id: mongojs.ObjectId(req.params.id)}, 
        update: {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName, 
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email, 
            skinType: req.body.skinType,
            previousMedicalConditions: req.body.previousMedicalConditions,
            previousTreatments: req.body.previousTreatments,
            skinCareProductsUsed: req.body.skinCareProductsUsed,
            discovery: req.body.discovery,
            history: req.body.history,
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
    db.clients.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, doc) {
        res.json(doc);
    });

});

/////////////////// HISTORY collection /////////////////////////////////////
//Get all history in history collection
app.get('/history', function(req, res) {
    db.history.find(function(err, docs) {
        res.json(docs);
    });
});

//Search clients in clients collection
app.get('/history/client/:id', function(req, res) {
    db.history.find({ "_clientId": req.params.id }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/history', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db.history.insert(req.body, function(err, docs) {
        res.json(docs);
    });
});

//Update history item in db
app.put('/history/:id', function(req, res) {
    console.log("update history with id", req.params.id);
    console.log("update history with data", req.body);
    var updatedOn = new Date();

    db.history.findAndModify({
        query: {_id: mongojs.ObjectId(req.params.id)}, 
        update: {$set: {
            date: req.body.date,
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
//Add clients in clients collection
app.post('/services', function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db.services.insert(req.body, function(error, doc) {
        res.json(doc);
    });
});

//Get all services in services collection
app.get('/services', function(req, res) {
    db.services.find(function(err, docs) {
        res.json(docs);
    });
});

//Update client in db
app.put('/services/:id', function(req, res) {
    console.log("update services with id", req.params.id);
    console.log("update services with data", req.body);
    var updatedOn = new Date();

    db.services.findAndModify({
        query: {_id: mongojs.ObjectId(req.params.id)}, 
        update: {$set: {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            duration: req.body.duration,
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
    db.services.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, doc) {
        res.json(doc);
    });

});



app.listen(PORT, function(){
    openurl.open(LOCATION + ':' + PORT);
	console.log("DO NOT CLOSE THIS WINDOW!");
    console.log("server running on port:", PORT);
});
