(function() {
    'use strict';

    angular
        .module('cm.dataservices.services', [])
        .service('ServicesDataService', ServicesDataService);

    ServicesDataService.$inject = ['$http'];
    function ServicesDataService($http) {
        var service = this;
        service.name = 'service';

        service.addService      = addService;
        service.getAllServices  = getAllServices;
        service.updateService   = updateService;
        service.deleteService   = deleteService;

        function addService(newService) {
            return $http.post('/api/services', newService)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllServices() {
            return $http.get('/api/services')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateService(service) {
            return $http.put('/api/services/' + service._id, service)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteService(serviceId) {
            return $http.delete('/api/services/' + serviceId)
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