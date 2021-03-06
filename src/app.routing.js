(function() {
	'use strict';

	angular
		.module('cm')
		.config(appRouting);

	appRouting.$inject = ['$urlRouterProvider','$stateProvider', '$locationProvider'];
	function appRouting($urlRouterProvider, $stateProvider, $locationProvider) {
					
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true
		});

		$urlRouterProvider.otherwise('/home');
		
		$stateProvider
			.state('test', {
				url: '/test',
				component: 'test',
				onEnter: function() { 
					console.log('entering test');
				},
				onExit: function() { 
					console.log('exiting test');
				}
			})
			.state('home', {
				url: '/home',
				component: 'home'
			})
			.state('client', {
				url: '/client/:id',
				component: 'client'
			})
			.state('client-edit', {
				url: '/client/:id/edit/client',
				component: 'client'
			})
			.state('session-edit', {
				url: '/client/:id/edit/session/:sessionId',
				component: 'client'
			})
			.state('settings', {
				url: '/settings',
				views: {
					'': 'settings'
				}
			})
			.state('services', {
				url: '/services',
				parent: 'settings',
				views: {
					'settingsView@settings': 'services'
				}
			})
			.state('products', {
				url: '/products',
				parent: 'settings',
				views: {
					'settingsView@settings': 'products'
				}
			})
			.state('consumables', {
				url: '/consumables',
				parent: 'settings',
				views: {
					'settingsView@settings': 'consumables'
				}
			})
			.state('staff', {
				url: '/staff',
				parent: 'settings',
				views: {
					'settingsView@settings': 'staff'
				}
			})
			.state('roles', {
				url: '/roles',
				parent: 'settings',
				views: {
					'settingsView@settings': 'roles'
				}
			})
			.state('shop', {
				url: '/shop',
				component: 'shop'
			})
			.state('bankAccount', {
				url: '/bank-account',
				component: 'bankAccount'
			})			
			.state('calendar', {
				url: '/calendar/:date',
				component: 'calendar',
				params : {
					date: {
						value: null,
						squash: true,
					}
				}
			});
	}

})();