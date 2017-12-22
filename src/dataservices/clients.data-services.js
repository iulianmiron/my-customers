(function() {
    'use strict';

    angular
        .module('cm.dataservices.clients', [])
        .service('ClientsDataService', ClientsDataService);
       
    ClientsDataService.$inject = ['$http'];
    function ClientsDataService($http) {
        var service = this;

        service.addClient = addClient;
        service.getClient = getClient;
        service.updateClient = updateClient;
        service.deleteClient = deleteClient;
        service.searchClients = searchClients;

        function addClient(client) {
            return $http.post('/api/clients', client)
                .then(_handleSuccess)
                .catch(function(error) {
                    $log.error('Could not add client', error);
                });
        }

        function getClient(clientId) {
            return $http.get('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(function(error) {
                    $log.error('Could not get client', error);
                });
        }

        function updateClient(client) {
            return $http.put('/api/clients/' + client._id, client)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not update client', error);
                });
        }

        function deleteClient(clientId) {
            return $http.delete('/api/clients/' + clientId)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not delete client', error);
                });
        }
        
        function searchClients(query) {
            if (query) {
                return $http.get('/api/clients/search/' + query)
                    .then(_handleSuccess)
                    .catch(function(error) {
                        console.error('Could not search clients', error);
                    });
            }
        }

        function _handleSuccess(response){
            return response.data;
        }
    }
})();