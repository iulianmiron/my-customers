var mongojs = require('mongojs');

var db_base = '127.0.0.1';
var PORT = (process.env.PORT && process.env.PORT.trim()) || '3500';
var db_port = process.env.DEV_SERVER_PORT || '27017';

var db = db_base + ':' + db_port.trim() + '/';

var db_services     = mongojs(db + 'services', ['types']);

//Get all service type
exports.getAll = function(req, res) {
    db_services.types.find(function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Add service type
exports.add = function(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_services.types.insert(req.body, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};

//Update service type
exports.update = function(req, res) {
    var updatedOn = new Date();

    db_services.types.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: {
                name: req.body.name,
                isProtected: req.body.isProtected,
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

//delete service type
exports.delete = function(req, res) {
    db_services.types.remove({ _id: mongojs.ObjectId(req.params.id) }, function(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    });
};