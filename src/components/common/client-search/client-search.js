(function() {
    'use strict';

    angular
        .module('cm.components.common.clientSearch', [])
        .component('clientSearch', {
            templateUrl: '/components/common/client-search/client-search.html',
            controller: ClientSearchController,
            bindings: {
                show: '<',
                showClearButton: '<',
                defaultSelection: '<',
                onBlur: '&',
                onSelection: '&'
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
            if(changes.showClearButton && changes.showClearButton.currentValue) {
                ctrl.status.showClearButton = angular.copy(changes.showClearButton.currentValue);
            }
            if(changes.defaultSelection && changes.defaultSelection.currentValue && !angular.equals(changes.defaultSelection.currentValue, changes.defaultSelection.previousValue)) {
                ctrl.data.selectedItem = angular.copy(changes.defaultSelection.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.actions.searchClients = searchClients;
            ctrl.actions.onSelection = onSelection;
            ctrl.actions.hideSearch = hideSearch;
        }

        function searchClients(query) {
            var deferred = $q.defer();

            ClientsDataService
                .searchAll(query)
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

        function onSelection(client) {
            ctrl.onSelection({$event: {client: client}});
        }

        function hideSearch(hideSearch) {
            ctrl.onBlur({ $event: {hideSearch: hideSearch} });
        }
    }
})();