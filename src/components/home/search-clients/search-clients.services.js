(function() {
    'use strict';

    angular
        .module('cm.services.searchClients', [])
        .service('SearchClientsServices', SearchClientsServices);

    function SearchClientsServices($http, $log) {
        var service = this;

        service.searchClients = searchClients;

        function searchClients(query) {
            if (query) {
                return $http.get('/clients/search/' + query).then(function(rClients) {
                    return rClients.data;
                }).catch(function(error) {
                    $log.error('Could not get clients', error);
                });
            }
        }
    }

    SearchClientsServices.$inject = ['$http', '$log'];
})();