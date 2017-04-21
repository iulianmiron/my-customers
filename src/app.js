(function() {
	'use strict';

	angular
		.module('cm', [
			'ngMaterial',
			'ngMessages',
			'ngAnimate',
			'ui.router',
			'angularMoment',
			'toastr',

			'cm.constants',
			'cm.services',
			'cm.components'
			])
		.config(appConfig)
		.run(appRun)
		.controller('appController', appCtrl);

		function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, toastrConfig) {
			$mdThemingProvider.theme('default')
    			.primaryPalette('blue')
    			.accentPalette('orange');

			// $locationProvider.html5Mode(true);
			$urlRouterProvider.otherwise('/home');

			 angular.extend(toastrConfig, {
				closeButton: true,
    			closeHtml: '<button>&times;</button>',
				autoDismiss: true,
				containerId: 'toast-container',
				maxOpened: 5,    
				newestOnTop: true,
				positionClass: 'toast-bottom-right',
				preventDuplicates: false,
				preventOpenDuplicates: false,
				progressBar: true,
    			tapToDismiss: true,
				extendedTimeOut: 5000,
				target: 'body'
			});

			$stateProvider
				.state('home', {
					url: '/home',
					component: 'home'
				})
				.state('client', {
					url: '/client/:id',
					component: 'client'
				})
				.state('admin', {
					url: '/admin',
					component: 'admin'
				});
		}

		function appRun(amMoment) {
			amMoment.changeLocale('ro');
		}

		function appCtrl($http, $log, toastr) {
			var ctrl = this;

			ctrl.data 		= {};
			ctrl.status 	= {};
			ctrl.actions 	= {};

			ctrl.status.isSidenavOpen = false;
			ctrl.actions.controlSidenav = controlSidenav;

			ctrl.actions.addClient = addClient;
			ctrl.actions.removeClient = removeClient;
			ctrl.actions.editClient = editClient;
			ctrl.actions.updateClient = updateClient;
			ctrl.actions.clearForm = clearForm;

			// getClients();

			function getClients() {
				$http.get('/clients').then(function(rClients) {
					ctrl.data.clients = rClients.data;
				});
			}

			function addClient(client) {
				client._id = "";
				console.log('new client', client);
				$http.post('/clients', client).then(function(response) {
					console.log(response);
					getClients();
				});
			}

			function removeClient(id) {
				console.log('delete client', id);
				$http.delete('/clients/' + id).then(function(rSuccess){
					console.log('rSuccess', rSuccess);
					getClients();
				}).catch(function(rErrorMessage) {
					console.log('rErrorMessage', rErrorMessage)
				});
			}

			function editClient(id) {
				console.log('edit client', id);

				$http.get('/clients/' + id).then(function(response) {
					ctrl.data.client = response.data;
				});
			}

			function updateClient(client) {
				console.log('update client', ctrl.data.client._id);

				$http.put('/clients/' + ctrl.data.client._id, ctrl.data.client).then(function(success) {
					
					getClients();
				}).catch(function(error) {
					console.log('error', error);
				});

			}

			function clearForm() {
				ctrl.data.client = {};
			}

			function controlSidenav(event) {
				ctrl.status.isSidenavOpen = event.sidenavControl;
			}
		}

		appConfig.$inject 	= ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'toastrConfig'];
		appRun.$inject 		= ['amMoment'];
		appCtrl.$inject 	= ['$http', '$log', 'toastr'];
})();