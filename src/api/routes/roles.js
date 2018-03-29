var mongojs = require('mongojs');
var db = require('../config').db;

var db_staff = mongojs(db + 'staff', ['roles']);

module.exports = {
    getAll: getAll,
    search: search,
    add: add,
    update: update,
    delete: deleteOne
};

function search(req, res) {
    db_staff.roles.aggregate([
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

    db_staff.roles.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function getAll(req, res) {
    db_staff.roles.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

function deleteOne(req, res) {
    db_staff.roles.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
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
    }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};
