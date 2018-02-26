var mongojs = require('mongojs');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var db_clients      = mongojs(db + 'clients', ['clients']);

//Get all clients in clients collection
exports.getAll = function (req, res) {
    db_clients.clients.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Search clients in clients collection
exports.search = function (req, res) {
    db_clients.clients.aggregate([
        { $match: { $text: { $search: req.params.query} } },
        { $sort: { score: { $meta: "textScore" } } }
    ], function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });

};

//Add clients in clients collection
exports.add = function (req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.clients.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Find client by id
exports.getOne = function (req, res) {
    db_clients.clients.findOne({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update client in db_clients
exports.update = function (req, res) {
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

exports.delete = function (req, res) {
    db_clients.clients.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

