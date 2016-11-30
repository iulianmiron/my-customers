(function() {
	'use strict';

	angular
		.module('cm', [
			'ngMaterial',
			'ui.router',

			'cm.components'
			])
		.config(['$stateProvider', '$urlRouterProvider', appConfig])
		.controller('appController', appCtrl);

		function appConfig($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/home');

			$stateProvider
				.state('home', {
					url: '/home',
					views: {
						'': {
							template: '<home></home>'
						},
						'searchClients@home': {
							template: '<search-clients></search-clients>'
						}
					}
				});
		}

		function appCtrl() {
			var ctrl = this;

			ctrl.data = {};
			ctrl.actions = {};
			ctrl.status = {};

			ctrl.status.isSidenavOpen = false;
		}
})();