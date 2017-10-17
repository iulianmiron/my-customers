(function() {
    'use strict';

    angular
        .module('cm.components.common.clientSearch', [])
        .component('clientSearch', {
            templateUrl: '/components/common/client-search/client-search.html',
            controller: ClientSearchController,
            bindings: {
            }
        });

    function ClientSearchController($q, $state, $log, SearchClientsServices) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.actions.searchClients = searchClients;
            ctrl.actions.openClientPage = openClientPage;
        }

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
            if(clientId || clientId === 0) {
                $state.go('client', { id: clientId });
            }
        }

    }

    ClientSearchController.$inject = ['$q', '$state', '$log', 'SearchClientsServices'];
})();