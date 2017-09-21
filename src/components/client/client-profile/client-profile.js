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

    function ClientProfileController($log, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
                ctrl.data.clientBackup = angular.copy(changes.clientData.currentValue);
            }
            if (changes.newClient && changes.newClient.currentValue) {
                ctrl.data.newClient = angular.copy(changes.newClient.currentValue);
                ctrl.status.editClient = !!ctrl.data.newClient;
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.clientVip = {
                levels: CLIENT_VIP_LEVELS,
                types: CLIENT_VIP_TYPES
            };

            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.setVIPData = setVIPData;
            ctrl.actions.saveClientProfile = saveClientProfile;
            ctrl.actions.resetForm = resetForm;
        }

        function saveClientProfile(clientData) {
            ctrl.onSaveClientProfile({
                $event: { clientData: clientData }
            });
            ctrl.data.clientBackup = angular.copy(clientData);
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;
        }

        function setVIPData(client) {
            client.vip = client.isVip ? client.vip : null;
        }

        function resetForm() {
            ctrl.status.editClient = false;
            ctrl.data.client = angular.copy(ctrl.data.clientBackup);
        }
    }

    ClientProfileController.$inject = ['$log', 'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES'];
})();