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

    function AppHeaderController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.status.showSearch = false;
            
            ctrl.actions.hideSearch = hideSearch; 
        }

        function hideSearch(event) {
            ctrl.status.showSearch = event.hideSearch;
        }

    }

    AppHeaderController.$inject = [];
})();