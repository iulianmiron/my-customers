(function() {
    'use strict';

    angular
        .module('cm.components.settings', [])
        .component('settings', {
            templateUrl: '/components/settings/settings.html',
            controller: SettingsController,
            bindings: {}
        });

    function SettingsController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.selectedTab = 3;
        }
    }

    SettingsController.$inject = [];
})();