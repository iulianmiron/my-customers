(function() {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {
                historyData: '<',
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
            if (changes.historyData && changes.historyData.currentValue) {
                ctrl.data.history = angular.copy(changes.historyData.currentValue);
                angular.forEach(ctrl.data.history, function(iHistory) {
                    iHistory.date = new Date(iHistory.date);
                });
            }
        }
        ctrl.$onInit = function() {
            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;
        }

        function addNewHistoryItem(event) {
            ctrl.onAddHistoryItem({ $event: { event: event } });
        }

        function editHistoryItem(event, historyItem) {
            ctrl.onEditHistoryItem({ $event: { historyItem: historyItem, event: event } });
        }
    }

    ClientHistoryController.$inject = ['$element', '$timeout', 'moment', 'SERVICE_TYPES', 'USERS'];
})();