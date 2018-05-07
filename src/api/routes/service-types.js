var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_services = mongojs(db + 'services', ['types']);

module.exports = {
    getAll: getAll,
    getOne: getOne,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res) { db_services.types.find(responseFn(res)); };
function getOne(req, res) { db_services.types.findOne({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };
function deleteOne(req, res) { db_services.types.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.types.insert(req.body, responseFn(res));
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
    }, responseFn(res));
};