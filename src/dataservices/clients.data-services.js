(function() {
    'use strict';

    angular
        .module('cm.dataservices.clients', [])
        .service('ClientsDataService', ClientsDataService);
       
    ClientsDataService.$inject = ['$http'];
    function ClientsDataService($http) {
        var service = this;
        service.name = 'client';

        service.getAll = getAll;
        service.addNew = addNew;
        service.getOne = getOne;
        service.updateOne = updateOne;
        service.deleteOne = deleteOne;
        service.searchAll = searchAll;

        function getAll() {
            return $http.get('/api/clients')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function addNew(client) {
            return $http.post('/api/clients', client)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getOne(clientId) {
            return $http.get('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateOne(client) {
            return $http.put('/api/clients/' + client._id, client)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteOne(clientId) {
            return $http.delete('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(_handleError);
        }
        
        function searchAll(query) {
            if (query) {
                return $http.get('/api/clients/search/' + query)
                    .then(_handleSuccess)
                    .catch(_handleError);
            }
        }

        function _handleSuccess(response){
            return response.data;
        }

        function _handleError(response) {
            var operation = response.config.method ? response.config.method.toLowerCase() : 'perform operation on';
            console.error('Could not ' + operation + ' ' + service.name);
            console.error('Error: ', response);
        }
    }
})();