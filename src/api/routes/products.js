var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_products = mongojs(db + 'products', ['products']);

module.exports = {
    getAll: getAll,
    add: add,
    update: update,
    delete: deleteOne
};

function getAll(req, res)       { db_products.products.find(responseFn(res)); };
function deleteOne(req, res)    { db_products.products.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_products.products.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_products.products.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};
