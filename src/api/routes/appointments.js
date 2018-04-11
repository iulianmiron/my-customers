var mongojs = require('mongojs');
var db = require('../config').db;

var db_clients = mongojs(db + 'clients', ['appointments']);

module.exports = {
    getAll: getAll,
    getOne: getOne,
    search: search,
    getAllByDate: getAllByDate,
    getClientAppointments: getClientAppointments,
    add: add,
    update: update,
    delete: deleteOne
};

function search(req, res) {
    db_clients.appointments.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getClientAppointments(req, res) {
    db_clients.appointments.find({ "_clientId": req.params.id }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getAllByDate(req, res) {
    var startDate = new Date(req.params.date);
    startDate.setSeconds(0, 0, 0);

    var dateMidnight = new Date(startDate);
    dateMidnight.setHours(23, 59, 59);

    db_clients.appointments.find({date: {"$gte": startDate, "$lt": dateMidnight} }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
}

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();
    req.body.date = new Date(req.body.date);

    db_clients.appointments.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getAll(req, res) {
    db_clients.appointments.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getOne(req, res) {
    db_clients.appointments.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_clients.appointments.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_clients.appointments.findAndModify({
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