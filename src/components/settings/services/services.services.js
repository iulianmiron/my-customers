(function() {
    'use strict';

    angular
        .module('cm.services.settings.services', [])
        .service('ServicesDataService', ServicesDataService);

    function ServicesDataService($http, $log) {
        var service = this;

        service.addService = addService;
        service.getAllServices = getAllServices;
        service.updateService = updateService;
        service.deleteService = deleteService;

        function addService(newService) {
            return $http.post('/services', newService).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add service', error);
            });
        }

        function getAllServices() {
            return $http.get('/services').then(function(rServices) {
                return rServices.data;
            }).catch(function(error) {
                console.log('Could not get all services', error);
            });
        }

        function updateService(service) {
            return $http.put('/services/' + service._id, service).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update client', error);
            });
        }

        function deleteService(serviceId) {
            return $http.delete('/services/' + serviceId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete service', error);
            });
        }
    }

    ServicesDataService.$inject = ['$http', '$log'];
})();