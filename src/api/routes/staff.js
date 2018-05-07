var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_staff    = mongojs(db + 'staff', ['staff']);

module.exports = {
    getAll: getAll,
    getOne: getOne,
    search: search,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res)       { db_staff.staff.find(responseFn(res)); };
function getOne(req, res)       { db_staff.staff.findOne({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };
function deleteOne(req, res)    { db_staff.staff.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function search(req, res) {
    db_staff.staff.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], responseFn(res));
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_staff.staff.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_staff.staff.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};