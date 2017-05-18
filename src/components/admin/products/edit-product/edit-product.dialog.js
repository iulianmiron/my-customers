(function () {
    'use strict';

    angular
        .module('cm.components.admin.products.editProductDialog', [])
		.controller('EditProductDialogController', EditProductDialogController);

    function EditProductDialogController($mdDialog, NO_PICTURE, product) {
        var ctrl = this;
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

		ctrl.actions.cancel = cancel;
		ctrl.actions.save = save;

        ctrl.data.noPicture = NO_PICTURE;
        ctrl.data.product = product;
        
		function cancel() {
			$mdDialog.cancel();
		};

		function save(product) {
			$mdDialog.hide(product);
		};
    }

    EditProductDialogController.$inject = ['$mdDialog', 'NO_PICTURE', 'product'];
})();