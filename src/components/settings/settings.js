(function() {
    'use strict';

    angular
        .module('cm.components.settings', [])
        .component('settings', {
            templateUrl: '/components/settings/settings.html',
            controller: SettingsController,
            bindings: {}
        });

    SettingsController.$inject = [];
    function SettingsController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
        }
    }
})();