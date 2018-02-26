(function() {
    'use strict';

    angular
        .module('cm.components.common.clientSearch', [])
        .component('clientSearch', {
            templateUrl: '/components/common/client-search/client-search.html',
            controller: ClientSearchController,
            bindings: {
                show: '<',
                onBlur: '&',
                clientFn: '&'
            }
        });
        
    ClientSearchController.$inject = ['$q', '$state', 'ClientsDataService', 'toastr'];
    function ClientSearchController($q, $state, ClientsDataService, toastr) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if(changes.show && changes.show.currentValue) {
                ctrl.status.show = angular.copy(changes.show.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.actions.searchClients = searchClients;
            ctrl.actions.clientFn = clientFn;
            ctrl.actions.hideSearch = hideSearch;
        }

        function searchClients(query) {
            var deferred = $q.defer();

            ClientsDataService
                .searchClients(query)
                .then(handleSuccess)
                .catch(handleError);

            function handleSuccess(rClients) {
                deferred.resolve(rClients);
            }

            function handleError(rErrorMessage) {
                console.error('Could not get clients', rErrorMessage);
                deferred.reject(rErrorMessage);
            }
            return deferred.promise;
        }

        function clientFn(client) {
            ctrl.clientFn({$event: {client: client}});
        }

        function hideSearch(hideSearch) {
            ctrl.onBlur({ $event: {hideSearch: hideSearch} });
        }
    }
})();