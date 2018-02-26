var mongojs = require('mongojs');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var db_clients      = mongojs(db + 'clients', ['history']);

//Get all history in history collection
exports.getAll = function (req, res) {
    db_clients.history.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Search history for one client in history collection
exports.getClientHistory = function(req, res) {
    db_clients.history.find({ "_clientId": req.params.id }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

exports.add = function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_clients.history.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update history item in db_clients
exports.update = function(req, res) {
    var updatedOn = new Date();

    db_clients.history.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                date: req.body.date,
                servicesPerformedBy: req.body.servicesPerformedBy,
                services: req.body.services,
                interval: req.body.interval,
                homeProducts: req.body.homeProducts,
                observations: req.body.observations,
                photosTaken: req.body.photosTaken,
                videosTaken: req.body.videosTaken,
                _clientId: req.body._clientId,
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
    db_clients.history.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};