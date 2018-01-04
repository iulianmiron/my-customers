(function() {
    'use strict';

    angular
        .module('cm.dataservices.consumables', [])
        .service('ConsumablesDataService', ConsumablesDataService);

    ConsumablesDataService.$inject = ['$http'];
    function ConsumablesDataService($http) {
        var service = this;
        service.name = 'consumable';

        service.addConsumable = addConsumable;
        service.getAllConsumables = getAllConsumables;
        service.updateConsumable = updateConsumable;
        service.deleteConsumable = deleteConsumable;

        function addConsumable(newConsumable) {
            return $http.post('/api/Consumables', newConsumable)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllConsumables() {
            return $http.get('/api/Consumables')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateConsumable(consumable) {
            return $http.put('/api/Consumables/' + consumable._id, consumable)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteConsumable(consumableId) {
            return $http.delete('/api/Consumables/' + consumableId)
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