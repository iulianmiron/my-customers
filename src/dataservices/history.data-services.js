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
            return $http.put('/api/history', historyItem).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.error('Could not add historyItem', error);
            });
        }

        function getClientHistory(clientId) {
            return $http.get('/api/history/client/' + clientId).then(function(rClientHistory) {
                return rClientHistory.data;
            }).catch(function(error) {
                $log.error('Could not get historyItem', error);
            });
        }

        function editHistoryItem(historyItem) {
            return $http.put('/api/history/' + historyItem._id, historyItem).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not edit historyItem', error);
            });;
        }

        function getAllHistory() {
            return $http.get('/api/history').then(function(rHistory) {
                return rHistory.data;
            }).catch(function(error) {
                console.log('Could not get history', error);
            });
        }
    }

})();