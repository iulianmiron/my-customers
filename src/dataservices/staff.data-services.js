(function() {
    'use strict';

    angular
        .module('cm.dataservices.staff', [])
        .service('StaffDataService', StaffDataService);

    StaffDataService.$inject = ['$http'];
    function StaffDataService($http) {
        var service = this;

        service.addStaff = addStaff;
        service.getAllStaff = getAllStaff;
        service.updateStaff = updateStaff;
        service.deleteStaff = deleteStaff;
        service.searchStaff = searchStaff;

        function addStaff(newStaff) {
            return $http.post('/api/staff', newStaff)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not add Staff', error);
                });
        }

        function getAllStaff() {
            return $http.get('/api/staff')
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not get all Staff', error);
                });
        }

        function updateStaff(staff) {
            return $http.put('/api/staff/' + staff._id, staff)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not update Staff', error);
                });
        }

        function deleteStaff(staffId) {
            return $http.delete('/api/staff/' + staffId)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not delete staff', error);
                });
        }

        function searchStaff(query) {
            if (query) {
                return $http.get('/api/staff/search/' + query)
                    .then(_handleSuccess)
                    .catch(function(error) {
                        console.error('Could not search staff', error);
                    });
            }
        }

        function _handleSuccess(response){
            return response.data;
        }
    }
})();