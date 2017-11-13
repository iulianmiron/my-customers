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
                onEditHistoryItem: '&'
            }
        });

    function ClientHistoryController($element, $timeout, moment, SERVICE_TYPES, USERS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
            }
            if (changes.historyData && changes.historyData.currentValue) {
                ctrl.data.history = angular.copy(changes.historyData.currentValue);
                angular.forEach(ctrl.data.history, function(iHistory) {
                    iHistory.date = new Date(iHistory.date);
                });
            }
            if (changes.services && changes.services.currentValue) {
                ctrl.data.services = angular.copy(changes.services.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.users = USERS;
            ctrl.data.maxDate = new Date();
            ctrl.data.servicesTypes = prepareDropDown(SERVICE_TYPES);

            $timeout(function() {
                ctrl.status.isOpen = false;
            }, 500);

            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;

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

        function editHistoryItem(event, historyItem) {
            ctrl.onEditHistoryItem({ $event: { historyItem: historyItem, event: event } });
            resetNewHistoryItemForm();
        }
    }

    ClientHistoryController.$inject = ['$element', '$timeout', 'moment', 'SERVICE_TYPES', 'USERS'];
})();