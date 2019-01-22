(function() {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {
                newClient: '<',
                historyData: '<',
                onAddHistoryItem: '&',
                onEditHistoryItem: '&',
                onRefreshHistory: '&'
            }
        });

    ClientHistoryController.$inject = [];
    function ClientHistoryController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if(changes.newClient && changes.newClient.currentValue) {
                ctrl.data.newClient = angular.copy(changes.newClient.currentValue);
            }
            if (changes.historyData && changes.historyData.currentValue) {                
                ctrl.data.history = angular.copy(changes.historyData.currentValue);
                angular.forEach(ctrl.data.history, function(iHistory) {
                    iHistory.date = iHistory.performedServices.length 
                        ? moment(iHistory.performedServices[0].date) 
                        : moment(iHistory.soldProducts[0].date);
                });
                ctrl.data.clientId = ctrl.data.history.length && ctrl.data.history[0]._clientId;
            }
        }
        ctrl.$onInit = function() {
            ctrl.status.isPaidInFull = isPaidInFull;

            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;
            ctrl.actions.refreshHistory = refreshHistory;
        }

        function isPaidInFull(payment) {
            if(payment) {
                var fullDiscount = payment.costProducts + payment.costServices === payment.discountTotal;
                var paidInFull = payment.total === payment.paidAmount;
                return fullDiscount || paidInFull;
            }
        }

        function addNewHistoryItem(event) {
            ctrl.onAddHistoryItem({ $event: { event: event } });
        }

        function editHistoryItem(event, historyItem) {
            ctrl.onEditHistoryItem({ $event: { historyItem: historyItem, event: event } });
        }

        function refreshHistory(event) {
            ctrl.onRefreshHistory({ $event: { clientId: ctrl.data.clientId } });
        }
    }
})();