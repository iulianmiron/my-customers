(function() {
	'use strict';

	angular
		.module('cm.components.common.appLoading', [])
		.component('appLoading', {
			templateUrl: 'components/common/app-loading/app-loading.html',
			controller: AppLoadingController,
			bindings: {}
		});

		AppLoadingController.$inject = [];
		function AppLoadingController() {
			var ctrl = this;
			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.$onInit = function() {

			};
		}
})();