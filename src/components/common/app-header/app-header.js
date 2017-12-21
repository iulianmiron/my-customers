(function() {
    'use strict';

    angular
        .module('cm.components.common.appHeader', [])
        .component('appHeader', {
            templateUrl: '/components/common/app-header/app-header.html',
            controller: AppHeaderController,
            bindings: {
                showSidenav: '='
            }
        });

    AppHeaderController.$inject = ['$state'];
    function AppHeaderController($state) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.status.showSearch = false;
            
            ctrl.actions.hideSearch = hideSearch; 
            ctrl.actions.openClientPage = openClientPage;
        }

        function hideSearch(event) {
            ctrl.status.showSearch = event.hideSearch;
        }

        function openClientPage(clientId) {
            if(clientId || clientId === 0) {
                ctrl.status.showSearch = false;
                $state.go('client', { id: clientId });
            }
        }
    }
})();