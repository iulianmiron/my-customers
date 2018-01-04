(function() {
    'use strict';

    angular
        .module('cm.dataservices.history', [])
        .service('HistoryDataService', HistoryDataService);
        
    HistoryDataService.$inject = ['$http'];
    function HistoryDataService($http) {
        var service = this;
        service.name = 'history';

        service.addHistoryItem = addHistoryItem;
        service.getClientHistory = getClientHistory;
        service.editHistoryItem = editHistoryItem;
        service.getAllHistory = getAllHistory;

        function addHistoryItem(historyItem) {
            return $http.put('/api/history', historyItem)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getClientHistory(clientId) {
            return $http.get('/api/history/client/' + clientId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function editHistoryItem(historyItem) {
            return $http.put('/api/history/' + historyItem._id, historyItem)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllHistory() {
            return $http.get('/api/history')
                .then(_handleSuccess)
                .catch(_handleError);
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