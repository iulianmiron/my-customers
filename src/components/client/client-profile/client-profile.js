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
                onSaveClientProfile: '&'
            }
        });

    function ClientProfileController($log) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue && !changes.clientData.isFirstChange()) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
                ctrl.data.clientBackup = angular.copy(changes.clientData.currentValue);
            }
            if (changes.newClient && changes.newClient.currentValue) {
                ctrl.data.newClient = angular.copy(changes.newClient.currentValue);
                if (ctrl.data.newClient) {
                    ctrl.status.editClient = true;
                }
            }
        }
        ctrl.$onInit = function() {
            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.saveClientProfile = saveClientProfile;
            ctrl.actions.resetForm = resetForm;
        }

        function saveClientProfile(clientData) {
            console.log('clientData', clientData);
            ctrl.onSaveClientProfile({
                $event: { clientData: clientData }
            });
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;
        }

        function resetForm() {
            ctrl.status.editClient = false;
            ctrl.data.client = angular.copy(ctrl.data.clientBackup);
        }
    }

    ClientProfileController.$inject = ['$log'];
})();