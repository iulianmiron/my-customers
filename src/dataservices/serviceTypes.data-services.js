(function() {
    'use strict';

    angular
        .module('cm.dataservices.serviceTypes', [])
        .service('ServiceTypesDataService', ServiceTypesDataService);

    ServiceTypesDataService.$inject = ['$http',];
    function ServiceTypesDataService($http) {
        var service = this;

        service.addServiceType      = addServiceType;
        service.getAllServiceTypes  = getAllServiceTypes;
        service.updateServiceType   = updateServiceType;
        service.deleteServiceType   = deleteServiceType;

        function addServiceType(serviceType) {
            return $http.post('/api/service-types', serviceType).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.error('Could not add service type', error);
            });
        }

        function getAllServiceTypes() {
            return $http.get('/api/service-types').then(function(rServiceTypes) {
                return rServiceTypes.data;
            }).catch(function(error) {
                console.log('Could not get all service types', error);
            });
        }

        function updateServiceType(serviceType) {
            return $http.put('/api/service-types/' + serviceType._id, serviceType).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update service type', error);
            });
        }

        function deleteServiceType(serviceTypeId) {
            return $http.delete('/api/service-types/' + serviceTypeId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete service type', error);
            });
        }
    }

})();