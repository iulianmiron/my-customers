(function() {
    'use strict';

    angular
        .module('cm.components.common.appSidebar', [])
        .component('appSidebar', {
            templateUrl: '/components/common/app-sidebar/app-sidebar.html',
            controller: AppSidebarController,
            bindings: {
                sidenavControl: '<',
                onSidenavChange: '&'
            }
        });

    function AppSidebarController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.actions.controlSidenav = controlSidenav;

        function controlSidenav(sidenavControl) {
            ctrl.onSidenavChange({
                $event: { sidenavControl: sidenavControl }
            });
        }
    }

    AppSidebarController.$inject = [];
})();