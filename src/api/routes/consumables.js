var mongojs = require('mongojs');
var db = require('../config').db;

var db_consumables = mongojs(db + 'consumables', ['consumables']);

module.exports = {
    getAll: getAll,
    add: add,
    update: update,
    delete: deleteOne
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_consumables.consumables.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getAll(req, res) {
    db_consumables.consumables.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_consumables.consumables.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
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
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};