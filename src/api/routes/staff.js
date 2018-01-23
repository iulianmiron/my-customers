var mongojs = require('mongojs');
var db = require('../config').db;

var db_staff = mongojs(db + 'staff', ['staff']);

//Search staff in staff collection
exports.search = function(req, res) {
    db_staff.staff.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Add staff in staff collection
exports.add = function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_staff.staff.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Get all staff in staff collection
exports.getAll = function(req, res) {
    db_staff.staff.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Delete a specific staff
exports.delete = function(req, res) {
    db_staff.staff.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update staff in db_staff
exports.update = function(req, res) {
    var updatedOn = new Date();

    db_staff.staff.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                phoneNumber: req.body.phoneNumber,
                description: req.body.description,
                email: req.body.email,
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