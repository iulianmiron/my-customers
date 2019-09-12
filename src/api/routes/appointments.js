var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_clients  = mongojs(db + 'clients', ['appointments']);

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

function getAll(req, res)                   { db_clients.appointments.find(responseFn(res)); };
function getOne(req, res)                   { db_clients.appointments.findOne({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };
function deleteOne(req, res)                { db_clients.appointments.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };
function getClientAppointments(req, res)    { db_clients.appointments.find({ "_clientId": req.params.id }, responseFn(res)); };

function search(req, res) {
    db_clients.appointments.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], responseFn(res));
};

function getAllByDate(req, res) {
    var startDate = new Date(req.params.date);
    startDate.setSeconds(0, 0, 0);

    var dateMidnight = new Date(startDate);
    dateMidnight.setHours(23, 59, 59);

    db_clients.appointments.find({date: {"$gte": startDate, "$lt": dateMidnight} }, responseFn(res));
}

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();
    req.body.date = new Date(req.body.date);

    db_clients.appointments.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
    req.body.updatedOn = new Date();
    req.body.date = new Date(req.body.date);

    db_clients.appointments.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};