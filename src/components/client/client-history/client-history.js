(function() {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {
                clientData: '<',
                historyData: '<',
                services: '<',
                onAddHistoryItem: '&',
                onSelectHistoryItem: '&'
            }
        });

    function ClientHistoryController($element, moment, SERVICE_TYPES, USERS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue && !changes.clientData.isFirstChange()) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
            }
            if (changes.historyData && changes.historyData.currentValue && !changes.historyData.isFirstChange()) {
                ctrl.data.history = angular.copy(changes.historyData.currentValue);
                angular.forEach(ctrl.data.history, function(iHistory) {
                    iHistory.date = new Date(iHistory.date);
                });
            }
            if (changes.services && changes.services.currentValue && !changes.services.isFirstChange()) {
                ctrl.data.services = angular.copy(changes.services.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.users = USERS;
            ctrl.data.maxDate = new Date();
            ctrl.data.servicesTypes = prepareDropDown(SERVICE_TYPES);

            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.selectHistoryItem = selectHistoryItem;

            $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

            resetNewHistoryItemForm();

        }

        function prepareDropDown(servicesTypes) {
            return servicesTypes.map(function(iServiceType) { return iServiceType.name; });
        }

        function resetNewHistoryItemForm() {
            ctrl.status.showNewHistoryItemForm = false;
            ctrl.data.newHistoryEntry = {};
            ctrl.data.newHistoryEntry.date = new Date();
        }

        function addNewHistoryItem(newHistoryEntry, client) {
            ctrl.onAddHistoryItem({ $event: { newHistoryEntry: newHistoryEntry, client: client } });
            resetNewHistoryItemForm();
        }

        function selectHistoryItem(historyItem) {
            ctrl.onSelectHistoryItem({ $event: { historyItem: historyItem } });
            resetNewHistoryItemForm();
        }
    }

    ClientHistoryController.$inject = ['$element', 'moment', 'SERVICE_TYPES', 'USERS'];
})();