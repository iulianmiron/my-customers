(function() {
    'use strict';

    angular
        .module('cm.dataservices.history', [])
        .service('HistoryDataService', HistoryDataService);
        
    HistoryDataService.$inject = ['$http'];
    function HistoryDataService($http) {
        var service = this;

        service.addHistoryItem = addHistoryItem;
        service.getClientHistory = getClientHistory;
        service.editHistoryItem = editHistoryItem;
        service.getAllHistory = getAllHistory;

        function addHistoryItem(historyItem) {
            return $http.put('/api/history', historyItem)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not add historyItem', error);
                });
        }

        function getClientHistory(clientId) {
            return $http.get('/api/history/client/' + clientId)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not get historyItem', error);
                });
        }

        function editHistoryItem(historyItem) {
            return $http.put('/api/history/' + historyItem._id, historyItem)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not edit historyItem', error);
                });
        }

        function getAllHistory() {
            return $http.get('/api/history')
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not get history', error);
                });
        }

        function _handleSuccess(response){
            return response.data;
        }
    }

})();