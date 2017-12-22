(function() {
    'use strict';

    angular
        .module('cm.dataservices.consumables', [])
        .service('ConsumablesDataService', ConsumablesDataService);

    ConsumablesDataService.$inject = ['$http'];
    function ConsumablesDataService($http) {
        var service = this;

        service.addConsumable = addConsumable;
        service.getAllConsumables = getAllConsumables;
        service.updateConsumable = updateConsumable;
        service.deleteConsumable = deleteConsumable;

        function addConsumable(newConsumable) {
            return $http.post('/api/Consumables', newConsumable)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not add Consumable', error);
                });
        }

        function getAllConsumables() {
            return $http.get('/api/Consumables')
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not get all Consumables', error);
                });
        }

        function updateConsumable(consumable) {
            return $http.put('/api/Consumables/' + consumable._id, consumable)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not update Consumable', error);
                });
        }

        function deleteConsumable(consumableId) {
            return $http.delete('/api/Consumables/' + consumableId)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not delete consumable', error);
                });
        }

        function _handleSuccess(response){
            return response.data;
        }
    }
})();