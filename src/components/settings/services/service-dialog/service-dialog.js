(function() {
    'use strict';

    angular
        .module('cm.components.settings.services.serviceDialog', [])
        .controller('ServiceDialogController', ServiceDialogController);

    function ServiceDialogController($mdDialog, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.service = dialogData.service;
        ctrl.data.title = dialogData.title;
        ctrl.data.serviceTypes = dialogData.serviceTypes;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(service) {
            $mdDialog.hide(service);
        };
    }

    ServiceDialogController.$inject = ['$mdDialog', 'dialogData'];
})();