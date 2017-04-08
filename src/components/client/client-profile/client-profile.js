(function () {
    'use strict';

    angular
        .module('cm.components.clientProfile', [])
        .component('clientProfile', {
            templateUrl: '/components/client/client-profile/client-profile.html',
            controller: ClientProfileController,
            bindings: {}
        });

    function ClientProfileController ($log) {
    	var ctrl = this;
        
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.client = {};
        ctrl.status.edit = true;
        ctrl.status.showMoreProfileDetails = false;

        ctrl.actions.saveClientProfile = saveClientProfile;
        ctrl.actions.changeEditStatus = changeEditStatus;

        function saveClientProfile(client) {
            ctrl.data.client = client;

            $log.info('ctrl.data.client', ctrl.data.client);
            changeEditStatus(false);
            changeShowMoreProfileDetails(false);
        }

        function changeEditStatus(status) {
            ctrl.status.edit = status;
        }

        function changeShowMoreProfileDetails(status) {
            ctrl.status.showMoreProfileDetails = status;
        }
    }

    ClientProfileController.$inject = ['$log'];
})();