var mongojs = require('mongojs');
var db = require('../config').db;

var db_clients = mongojs(db + 'clients', ['clients']);

module.exports = {
    getAll: getAll,
    search: search,
    add: add,
    getOne: getOne,
    update: update,
    delete: deleteOne
};

function getAll(req, res) {
    db_clients.clients.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function search(req, res) {
    db_clients.clients.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });

};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.clients.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getOne(req, res) {
    db_clients.clients.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
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
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_clients.clients.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

