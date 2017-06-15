(function() {
    'use strict';

    angular
        .module('cm.components.admin.consumables.addConsumableDialog', [])
        .controller('AddConsumableDialogController', AddConsumableDialogController);

    function AddConsumableDialogController($mdDialog, NO_PICTURE) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        ctrl.data.noPicture = NO_PICTURE;

        function cancel() {
            $mdDialog.cancel();
        };

        function save(consumable) {
            $mdDialog.hide(consumable);
        };
    }

    AddConsumableDialogController.$inject = ['$mdDialog', 'NO_PICTURE'];
})();