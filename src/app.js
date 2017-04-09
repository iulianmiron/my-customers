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

		function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
			$locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/home');

			$stateProvider
				.state('home', {
					url: '/home',
					component: 'home'
				})
				.state('client', {
					url: '/client',
					component: 'client'
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

		appConfig.$inject 	= ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
		appCtrl.$inject 	= [];
})();