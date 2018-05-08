var mongojs     = require('mongojs');
var db          = require('../config').db;
var responseFn  = require('../utils/utils').handleResponse;

var db_users    = mongojs(db + 'users', ['users']);

module.exports = {
    login: login,
    logout: logout,
    getAll: getAll,
    getOne: getOne,
    search: search,
    add: add,
    update: update,
    delete: deleteOne
};

function login(req, res) {
    
}

function logout(req, res) {
    // console.log('request: ', req);
    // console.log('response: ', res);
}

function getAll(req, res)       { db_users.users.find(responseFn(res)); };
function getOne(req, res)       { db_users.users.findOne({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };
function deleteOne(req, res)    { db_users.users.remove({ _id: mongojs.ObjectId(req.params.id) }, responseFn(res)); };

function search(req, res) {
    db_users.users.aggregate([
        { $match: { $text: { $search: req.params.query } } },
        { $sort: { score: { $meta: "textScore" } } }
    ], responseFn(res));
};

function add(req, res) {
    req.body.createdOn = new Date();
    req.body.updatedOn = new Date();

    db_users.users.insert(req.body, responseFn(res));
};

function update(req, res) {
    delete req.body._id;
	req.body.updatedOn = new Date();

    db_users.users.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: {
            $set: req.body
        },
        new: true
    }, responseFn(res));
};