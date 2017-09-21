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
        }

    }

    AppHeaderController.$inject = [];
})();