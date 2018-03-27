(function() {
    'use strict';

    angular
        .module('cm.dataservices.roles', [])
        .service('RolesDataService', RolesDataService);

    RolesDataService.$inject = ['$http'];
    function RolesDataService($http) {
        var service = this;
        
        service.name = 'roles';
        service.apiLocation = '/api/' + service.name;

        service.addRole = addRole;
        service.getAllRoles = getAllRoles;
        service.updateRole = updateRole;
        service.deleteRole = deleteRole;
        service.searchRoles = searchRoles;

        function addRole(newRole) {
            return $http.post(service.apiLocation, newRole)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllRoles() {
            return $http.get(service.apiLocation)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateRole(role) {
            return $http.put(service.apiLocation + '/' + role._id, role)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteRole(roleId) {
            return $http.delete(service.apiLocation + '/' + roleId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function searchRoles(query) {
            if (query) {
                return $http.get(service.apiLocation + '/search/' + query)
                    .then(_handleSuccess)
                    .catch(_handleError);
            }
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