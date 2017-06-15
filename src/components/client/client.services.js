(function() {
    'use strict';

    angular
        .module('cm.services.client', [])
        .service('ClientServices', ClientServices)
        .service('HistoryServices', HistoryServices);

    function ClientServices($http, $log) {
        var service = this;

        service.addClient = addClient;
        service.getClient = getClient;
        service.updateClient = updateClient;

        function addClient(client) {
            return $http.post('/clients', client).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add client', error);
            });
        }

        function getClient(clientId) {
            return $http.get('/clients/' + clientId).then(function(rClient) {
                return rClient.data;
            }).catch(function(error) {
                $log.error('Could not get client', error);
            });
        }

        function updateClient(client) {
            return $http.put('/clients/' + client._id, client).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update client', error);
            });
        }
    }

    function HistoryServices($http, $log) {
        var service = this;

        service.addHistoryItem = addHistoryItem;
        service.getClientHistory = getClientHistory;
        service.editHistoryItem = editHistoryItem;
        service.getAllHistory = getAllHistory;

        function addHistoryItem(historyItem) {
            return $http.put('/history', historyItem).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add historyItem', error);
            });
        }

        function getClientHistory(clientId) {
            return $http.get('/history/client/' + clientId).then(function(rClientHistory) {
                return rClientHistory.data;
            }).catch(function(error) {
                $log.error('Could not get historyItem', error);
            });
        }

        function editHistoryItem(historyItem) {
            return $http.put('/history/' + historyItem._id, historyItem).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not edit historyItem', error);
            });;
        }

        function getAllHistory() {
            return $http.get('/history').then(function(rHistory) {
                return rHistory.data;
            }).catch(function(error) {
                console.log('Could not get history', error);
            });
        }
    }

    ClientServices.$inject = ['$http', '$log'];
    HistoryServices.$inject = ['$http', '$log'];
})();