(function () {
    'use strict';

    angular
        .module('cm.components.clientProfile', [])
        .component('clientProfile', {
            templateUrl: '/components/client/client-profile/client-profile.html',
            controller: ClientProfileController,
            bindings: {
                clientData: '<',
                onSaveClientProfile: '&'
            }
        });

    function ClientProfileController ($log) {
    	var ctrl = this;
        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if(changes.clientData) { ctrl.data.client = angular.copy(changes.clientData.currentValue); }
        }
        ctrl.$onInit = function() {
           
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.saveClientProfile = saveClientProfile;
        }   

        function saveClientProfile(clientData) {
            console.log('clientData', clientData);
            ctrl.onSaveClientProfile({ 
                $event: { clientData: clientData }
            });
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;
        }
    }

    ClientProfileController.$inject = ['$log'];
})();