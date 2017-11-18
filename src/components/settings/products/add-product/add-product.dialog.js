(function() {
    'use strict';

    angular
        .module('cm.components.settings.products.addProductDialog', [])
        .controller('AddProductDialogController', AddProductDialogController);

    function AddProductDialogController($mdDialog, NO_PICTURE) {
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

        function save(product) {
            $mdDialog.hide(product);
        };
    }

    AddProductDialogController.$inject = ['$mdDialog', 'NO_PICTURE'];
})();