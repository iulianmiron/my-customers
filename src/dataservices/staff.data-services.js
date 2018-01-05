(function() {
    'use strict';

    angular
        .module('cm.dataservices.staff', [])
        .service('StaffDataService', StaffDataService);

    StaffDataService.$inject = ['$http'];
    function StaffDataService($http) {
        var service = this;
        service.name = 'staff';

        service.addStaff = addStaff;
        service.getAllStaff = getAllStaff;
        service.updateStaff = updateStaff;
        service.deleteStaff = deleteStaff;
        service.searchStaff = searchStaff;

        function addStaff(newStaff) {
            return $http.post('/api/staff', newStaff)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllStaff() {
            return $http.get('/api/staff')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateStaff(staff) {
            return $http.put('/api/staff/' + staff._id, staff)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteStaff(staffId) {
            return $http.delete('/api/staff/' + staffId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function searchStaff(query) {
            if (query) {
                return $http.get('/api/staff/search/' + query)
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