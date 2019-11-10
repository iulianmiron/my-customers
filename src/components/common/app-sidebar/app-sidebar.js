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

    AppSidebarController.$inject = ['SIDEBAR_MENU_ITEMS', 'localStorageService'];
    function AppSidebarController(SIDEBAR_MENU_ITEMS, localStorageService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.sidebarMenuItems = SIDEBAR_MENU_ITEMS;
            ctrl.data.currentYear = moment().format('YYYY');

            ctrl.data.adminMode = localStorageService.get('show-admin-controls');
        }

    }
})();