var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_clients  = mongojs(db + 'clients', ['history']);

module.exports = {
    getAll: getAll,
    getClientHistory: getClientHistory,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res)           { db_clients.history.find(responseFn(res)); };
function getClientHistory(req, res) { db_clients.history.find({ "_clientId": req.params.id }, responseFn(res)); };
function deleteOne(req, res)        { db_clients.history.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.history.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_clients.history.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};

