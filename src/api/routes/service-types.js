var mongojs = require('mongojs');
var db = require('../config').db;

var db_services = mongojs(db + 'services', ['types']);

module.exports = {
    getAll: getAll,
    getOne: getOne,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res) {
    db_services.types.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getOne(req, res) {
    db_services.types.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.types.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_services.types.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_services.types.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};