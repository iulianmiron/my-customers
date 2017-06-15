(function() {
    'use strict';

    angular
        .module('cm.components.admin.consumables.editConsumableDialog', [])
        .controller('EditConsumableDialogController', EditConsumableDialogController);

    function EditConsumableDialogController($mdDialog, NO_PICTURE, consumable) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        ctrl.data.noPicture = NO_PICTURE;
        ctrl.data.consumable = consumable;

        function cancel() {
            $mdDialog.cancel();
        };

        function save(consumable) {
            $mdDialog.hide(consumable);
        };
    }

    EditConsumableDialogController.$inject = ['$mdDialog', 'NO_PICTURE', 'consumable'];
})();