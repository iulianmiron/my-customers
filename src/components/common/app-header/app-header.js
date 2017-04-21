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

			ctrl.status.showSearch = false;

    		ctrl.actions.searchClient = searchClient;
			ctrl.actions.showSearch = showSearch;
			ctrl.actions.controlSidenav = controlSidenav;

			function controlSidenav(sidenavControl) {
				ctrl.onSidenavChange({
					$event: { sidenavControl: sidenavControl }
				});
			}

			function searchClient(clientQuery) {
				
			}

			function showSearch() {
				ctrl.status.showSearch = !ctrl.status.showSearch;
			}
		}

		AppHeaderController.$inject = [];
})();