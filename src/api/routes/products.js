var mongojs = require('mongojs');
var db = require('../config').db;

var db_products = mongojs(db + 'products', ['products']);

exports.getAll = getAll;
exports.add = add;
exports.update = update;
exports.delete = deleteOne;

function getAll(req, res) {
    db_products.products.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_products.products.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_products.products.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
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
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};
