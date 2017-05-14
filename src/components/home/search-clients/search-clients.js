(function(){
	'use strict';

	angular
		.module('cm.components.home.searchClients', [])
		.component('searchClients', {
			templateUrl: '/components/home/search-clients/search-clients.html',
			controller: SearchClientsController,
			bindings: {}
		});

	function SearchClientsController ($q, $state, $log, SearchClientsServices) {
		var ctrl = this;
		ctrl.data = {};
		ctrl.status = {};
		ctrl.actions = {};

		ctrl.actions.searchClients = searchClients;
		ctrl.actions.openClientPage = openClientPage;

		function searchClients(query) {
			var deferred = $q.defer();

			SearchClientsServices
				.searchClients(query)
				.then(handleSuccess)
				.catch(handleError);

			function handleSuccess(rClients) {
				deferred.resolve(rClients);
			}
			function handleError(rErrorMessage) {
				$log.error('Could not get clients', rErrorMessage);
				deferred.reject(rErrorMessage);
			}
			return deferred.promise;
		}

		function openClientPage(clientId) {
			$state.go('client', { id: clientId });
		}
	}


		SearchClientsController.$inject = ['$q', '$state', '$log', 'SearchClientsServices'];
})();


