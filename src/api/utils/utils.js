module.exports = {
    handleResponse: _handleResponse
}

function _handleResponse(res) {
    function _responseFn(err, doc) {
        if (err) { console.log('Error: ', err); };
        res.json(doc);
    }
    
    return _responseFn;
}