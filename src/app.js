(function() {
	'use strict';

	angular
		.module('cm', [
			'ngMaterial',
			'ngMessages',
			'ui.router',

			'cm.services',
			'cm.components'
			])
		.config(appConfig)
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
				})
				.state('client', {
					url: '/client',
					views: {
						'': {
							template: '<client></client>'
						}
					}
				});
		}

		function appCtrl() {
			var ctrl = this;

			ctrl.data 		= {};
			ctrl.status 	= {};
			ctrl.actions 	= {};

			ctrl.status.isSidenavOpen = false;
			ctrl.actions.controlSidenav = controlSidenav;

			function controlSidenav(event) {
				ctrl.status.isSidenavOpen = event.sidenavControl;
			}
		}

		appConfig.$inject 	= ['$stateProvider', '$urlRouterProvider'];
		appCtrl.$inject 	= [];
})();