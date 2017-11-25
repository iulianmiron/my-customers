(function() {
    'use strict';

    angular
        .module('cm.dataservices.services', [])
        .service('ServicesDataService', ServicesDataService);

    ServicesDataService.$inject = ['$http'];
    function ServicesDataService($http) {
        var service = this;

        service.addService      = addService;
        service.getAllServices  = getAllServices;
        service.updateService   = updateService;
        service.deleteService   = deleteService;

        function addService(newService) {
            return $http.post('/api/services', newService).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.error('Could not add service', error);
            });
        }

        function getAllServices() {
            return $http.get('/api/services').then(function(rServices) {
                return rServices.data;
            }).catch(function(error) {
                console.log('Could not get all services', error);
            });
        }

        function updateService(service) {
            return $http.put('/api/services/' + service._id, service).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update client', error);
            });
        }

        function deleteService(serviceId) {
            return $http.delete('/api/services/' + serviceId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete service', error);
            });
        }
    }
})();