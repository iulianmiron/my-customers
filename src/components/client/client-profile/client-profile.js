(function () {
    'use strict';

    angular
        .module('cm.components.clientProfile', [])
        .component('clientProfile', {
            templateUrl: '/components/client/client-profile/client-profile.html',
            controller: ClientProfileController,
            bindings: {}
        });

    function ClientProfileController () {
    	var ctrl = this;
        
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};
        
        ctrl.data.client = {
        	firstName: 'first name',
        	lastName: 'last name'
        }
        
    }

    ClientProfileController.$inject = [];
})();