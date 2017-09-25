(function() {
    'use strict';

    angular
        .module('cm.components.common.appSidebar', [])
        .component('appSidebar', {
            templateUrl: '/components/common/app-sidebar/app-sidebar.html',
            controller: AppSidebarController,
            bindings: {
                showSidenav: '='
            }
        });

    function AppSidebarController(SIDEBAR_MENU_ITEMS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.sidebarMenuItems = SIDEBAR_MENU_ITEMS;
        }

    }

    AppSidebarController.$inject = ['SIDEBAR_MENU_ITEMS'];
})();