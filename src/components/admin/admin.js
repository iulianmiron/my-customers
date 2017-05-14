(function () {
    'use strict';

    angular
        .module('cm.components.admin', [])
        .component('admin', {
            templateUrl: '/components/admin/admin.html',
            controller: AdminController,
            bindings: {}
        });

    function AdminController() {
        var ctrl = this;
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

        ctrl.$onInit = function() {
            ctrl.data.selectedTab = 0;
        }
    }

    AdminController.$inject = [];
})();