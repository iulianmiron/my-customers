(function() {
    'use strict';

    angular
        .module('cm.components.settings.services.serviceTypeDialog', [])
        .controller('ServiceTypeDialogController', ServiceTypeDialogController);

    function ServiceTypeDialogController($mdDialog, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.serviceType = dialogData.serviceType;
        ctrl.data.title = dialogData.title;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(serviceType) {
            $mdDialog.hide(serviceType);
        };
    }

    ServiceTypeDialogController.$inject = ['$mdDialog', 'dialogData'];
})();