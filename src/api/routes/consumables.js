var mongojs = require('mongojs');
var db = require('../config').db;

var db_consumables = mongojs(db + 'consumables', ['consumables']);

//Add consumables in consumables collection
exports.add = function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_consumables.consumables.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Get all consumables in consumables collection
exports.getAll = function(req, res) {
    db_consumables.consumables.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Delete a specific consumable
exports.delete = function(req, res) {
    db_consumables.consumables.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update consumable in db_consumables
exports.update = function(req, res) {
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