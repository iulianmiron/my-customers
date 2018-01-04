(function() {
    'use strict';

    angular
        .module('cm.dataservices.serviceTypes', [])
        .service('ServiceTypesDataService', ServiceTypesDataService);

    ServiceTypesDataService.$inject = ['$http',];
    function ServiceTypesDataService($http) {
        var service = this;
        service.name = 'service type';

        service.addServiceType      = addServiceType;
        service.getAllServiceTypes  = getAllServiceTypes;
        service.updateServiceType   = updateServiceType;
        service.deleteServiceType   = deleteServiceType;

        function addServiceType(serviceType) {
            return $http.post('/api/service-types', serviceType)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllServiceTypes() {
            return $http.get('/api/service-types')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateServiceType(serviceType) {
            return $http.put('/api/service-types/' + serviceType._id, serviceType)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteServiceType(serviceTypeId) {
            return $http.delete('/api/service-types/' + serviceTypeId)
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