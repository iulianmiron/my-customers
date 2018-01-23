var mongojs = require('mongojs');
var db = require('../config').db;

var db_clients = mongojs(db + 'clients', ['history']);

module.exports = {
    getAll: getAll,
    getClientHistory: getClientHistory,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res) {
    db_clients.history.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getClientHistory(req, res) {
    db_clients.history.find({ "_clientId": req.params.id }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.history.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
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
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_clients.history.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};