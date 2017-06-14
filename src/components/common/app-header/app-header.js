(function(){
	'use strict';

	angular
		.module('cm.components.common.appHeader', [])
		.component('appHeader', {
			templateUrl: '/components/common/app-header/app-header.html',
			controller: AppHeaderController,
			bindings: {
				sidenavControl: '<',
				onSidenavChange: '&'
			}
		});

		function AppHeaderController() {
			var ctrl = this;
			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.$onChanges = function(changes) {
				if(changes.sidenavControl && changes.sidenavControl.currentValue) {
					ctrl.sidenavControl = angular.copy(changes.sidenavControl.currentValue);
				}
			}
			ctrl.$onInit = function() {
				ctrl.actions.controlSidenav = controlSidenav;
			}

			function controlSidenav(sidenavControl) {
				ctrl.onSidenavChange({
					$event: { sidenavControl: sidenavControl }
				});
			}
		}

		AppHeaderController.$inject = [];
})();