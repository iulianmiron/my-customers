(function() {
    'use strict';

    angular
        .module('cm.services.settings.consumables', [])
        .service('ConsumablesDataService', ConsumablesDataService);

    function ConsumablesDataService($http, $log) {
        var service = this;

        service.addConsumable = addConsumable;
        service.getAllConsumables = getAllConsumables;
        service.updateConsumable = updateConsumable;
        service.deleteConsumable = deleteConsumable;

        function addConsumable(newConsumable) {
            return $http.post('/Consumables', newConsumable).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add Consumable', error);
            });
        }

        function getAllConsumables() {
            return $http.get('/Consumables').then(function(rConsumables) {
                return rConsumables.data;
            }).catch(function(error) {
                console.log('Could not get all Consumables', error);
            });
        }

        function updateConsumable(consumable) {
            return $http.put('/Consumables/' + consumable._id, consumable).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update Consumable', error);
            });
        }

        function deleteConsumable(consumableId) {
            return $http.delete('/Consumables/' + consumableId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete consumable', error);
            });
        }
    }

    ConsumablesDataService.$inject = ['$http', '$log'];
})();