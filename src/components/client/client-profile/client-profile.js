(function() {
    'use strict';

    angular
        .module('cm.components.clientProfile', [])
        .component('clientProfile', {
            templateUrl: '/components/client/client-profile/client-profile.html',
            controller: ClientProfileController,
            bindings: {
                newClient: '<',
                clientData: '<',
                preferredStaff: '<',
                onEditClient: '&',
            }
        });
    ClientProfileController.$inject = ['$scope', '$mdMedia', 'UtilsService', 'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES'];
    function ClientProfileController($scope, $mdMedia, UtilsService, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
                ctrl.data.clientBackup = angular.copy(changes.clientData.currentValue);
                ctrl.data.client.age = ctrl.data.client.dateOfBirth ? calculateClientAge(ctrl.data.client.dateOfBirth): null;
            }
            if (changes.newClient && changes.newClient.currentValue) {
                ctrl.data.newClient = angular.copy(changes.newClient.currentValue);
            }
            if (changes.preferredStaff && changes.preferredStaff.currentValue) {
                ctrl.data.preferredStaff = angular.copy(changes.preferredStaff.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.clientVip = {
                levels: CLIENT_VIP_LEVELS,
                types: CLIENT_VIP_TYPES
            };

            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.copyToClipboard = copyToClipboard;
            ctrl.actions.editClient = editClient;
            ctrl.actions.calculateClientAge = calculateClientAge;
            // ctrl.status.hasRecentBirthday = hasRecentBirthday;
        }

        function copyToClipboard(data, title) {
            UtilsService.copyToClipboard(data, title);
        }

        function editClient(event, client) {
            ctrl.onEditClient({ $event: { client: client, event: event } });
        }

        function calculateClientAge(dateOfBirth) {
            return UtilsService.getAge(dateOfBirth) + ' ani';
        }

        $scope.$watch(function() { return $mdMedia('gt-sm'); }, function(boolean) {
            ctrl.status.showClientDetails = boolean;
        });

        // function hasRecentBirthday(clientDateOfBirth) {
        //     var currentYear = moment().get('year');
        //     var daysToBirthday = moment().diff(moment(clientDateOfBirth).year(currentYear), 'days');
        //     return daysToBirthday >= 90;
        // }
    }
})();