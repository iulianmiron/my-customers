(function() {
    'use strict';

    angular
        .module('cm.services.settings.services', [])
        .service('ServicesDataService', ServicesDataService)
        .service('ServiceTypesDataService', ServiceTypesDataService);

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

    function ServiceTypesDataService($http, $log) {
        var service = this;

        service.addServiceType      = addServiceType;
        service.getAllServiceTypes  = getAllServiceTypes;
        service.updateServiceType   = updateServiceType;
        service.deleteServiceType   = deleteServiceType;

        function addServiceType(serviceType) {
            return $http.post('/service-types', serviceType).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add service type', error);
            });
        }

        function getAllServiceTypes() {
            return $http.get('/service-types').then(function(rServiceTypes) {
                return rServiceTypes.data;
            }).catch(function(error) {
                console.log('Could not get all service types', error);
            });
        }

        function updateServiceType(serviceType) {
            return $http.put('/service-types/' + serviceType._id, serviceType).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update service type', error);
            });
        }

        function deleteServiceType(serviceTypeId) {
            return $http.delete('/service-types/' + serviceTypeId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete service type', error);
            });
        }
    }

    ServicesDataService.$inject = ['$http', '$log'];
    ServiceTypesDataService.$inject = ['$http', '$log'];
})();