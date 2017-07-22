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

    function AppSidebarController(SIDEBAR_MENU_ITEMS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if (changes.sidenavControl && changes.sidenavControl.currentValue) {
                ctrl.data.sidenavControl = angular.copy(changes.sidenavControl.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.sidebarMenuItems = SIDEBAR_MENU_ITEMS;

            ctrl.actions.controlSidenav = controlSidenav;
        }

        function controlSidenav(sidenavControl) {
            ctrl.data.sidenavControl = sidenavControl;
            ctrl.onSidenavChange({
                $event: { sidenavControl: sidenavControl }
            });
        }
    }

    AppSidebarController.$inject = ['SIDEBAR_MENU_ITEMS'];
})();