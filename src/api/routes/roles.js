var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_staff    = mongojs(db + 'staff', ['roles']);

module.exports = {
    getAll: getAll,
    search: search,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res) { db_staff.roles.find(responseFn(res)); };
function deleteOne(req, res) { db_staff.roles.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function search(req, res) {
    db_staff.roles.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], responseFn(res));
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_staff.roles.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_staff.roles.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};
