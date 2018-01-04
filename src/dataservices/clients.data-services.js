(function() {
    'use strict';

    angular
        .module('cm.dataservices.clients', [])
        .service('ClientsDataService', ClientsDataService);
       
    ClientsDataService.$inject = ['$http'];
    function ClientsDataService($http) {
        var service = this;
        service.name = 'client';

        service.addClient = addClient;
        service.getClient = getClient;
        service.updateClient = updateClient;
        service.deleteClient = deleteClient;
        service.searchClients = searchClients;

        function addClient(client) {
            return $http.post('/api/clients', client)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getClient(clientId) {
            return $http.get('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateClient(client) {
            return $http.put('/api/clients/' + client._id, client)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteClient(clientId) {
            return $http.delete('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(_handleError);
        }
        
        function searchClients(query) {
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