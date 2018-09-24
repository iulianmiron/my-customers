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

    AppHeaderController.$inject = ['$state', 'HotkeyService'];
    function AppHeaderController($state, HotkeyService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.status.showSearch = false;
            
            ctrl.actions.hideSearch = hideSearch; 
            ctrl.actions.openClientPage = openClientPage;

            HotkeyService.searchClient(displaySearch);
        }

        function displaySearch(event, hotkey) {
            ctrl.status.showSearch = !ctrl.status.showSearch;
        }

        function hideSearch(event) {
            ctrl.status.showSearch = event.hideSearch;
        }

        function openClientPage(event) {
            if(event.client && (event.client._id || event.client._id === 0)) {
                ctrl.status.showSearch = false;
                $state.go('client', { id: event.client._id });
            }
        }
    }
})();