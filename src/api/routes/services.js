var mongojs = require('mongojs');
var db = require('../config').db;

var db_services = mongojs(db + 'services', ['services']);

//Get all services in services collection
exports.getAll = function(req, res) {
    db_services.services.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Add services in services collection
exports.add = function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.services.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update client in db_clients
exports.update = function(req, res) {
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
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

exports.delete = function(req, res) {
    db_services.services.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};