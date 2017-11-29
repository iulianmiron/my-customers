(function() {
	'use strict';

	angular
		.module('cm.components.common.confirmDialog', [])
		.controller('ConfirmDialogController', ConfirmDialogController);

		ConfirmDialogController.$inject = ['$mdDialog', 'dialogData'];
		function ConfirmDialogController($mdDialog, dialogData) {
			var ctrl = this;
			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};
	
			ctrl.data.title = dialogData.title;
			ctrl.data.clientId = dialogData.clientId;
			ctrl.data.okText = dialogData.okText;
			ctrl.data.textContent = dialogData.textContent;
	
			ctrl.actions.cancel = cancel;
			ctrl.actions.save = save;

			function cancel() {
				$mdDialog.cancel();
			};
	
			function save() {
				$mdDialog.hide();
			};
		} 

})();
