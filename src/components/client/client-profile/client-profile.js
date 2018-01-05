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
                onEditClient: '&',
            }
        });
    ClientProfileController.$inject = ['$state', '$log', '$mdDialog', 'toastr', 'clipboard', 'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES', 'ClientsDataService'];
    function ClientProfileController($state, $log, $mdDialog, toastr, clipboard, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES, ClientsDataService) {
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
        }

        function copyToClipboard(copiedItem) {
            if(copiedItem) {
                clipboard.copyText(copiedItem);
                toastr.success(copiedItem + ' copiat in clipboard!');
            } else {
                toastr.warning('Nimic de copiat!');
            }
        }

        function editClient(event, client) {
            ctrl.onEditClient({ $event: { client: client, event: event } });
        }

        function calculateClientAge(dateOfBirth) {
            return moment().diff(moment(dateOfBirth), 'years') + ' ani';
        }
    }
})();