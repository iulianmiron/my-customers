(function() {
    'use strict';

    angular
        .module('cm.components.admin.consumables.consumableDialog', [])
        .controller('ConsumableDialogController', ConsumableDialogController);

    function ConsumableDialogController($mdDialog, NO_PICTURE, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.noPicture = NO_PICTURE;
        ctrl.data.consumable = dialogData.consumable;
        ctrl.data.title = dialogData.title;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(consumable) {
            $mdDialog.hide(consumable);
        };
    }

    ConsumableDialogController.$inject = ['$mdDialog', 'NO_PICTURE', 'dialogData'];
})();