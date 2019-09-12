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

    ClientHistoryController.$inject = ['UtilsService'];
    function ClientHistoryController(UtilsService) {
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
                ctrl.data.showHistoryItemDetails = generateHistoryDetailsList(ctrl.data.history);
                ctrl.data.showHistoryItemPayment = generateHistoryDetailsList(ctrl.data.history);
                ctrl.data.showHistoryItemObservations = generateHistoryObservationList(ctrl.data.history);
            }
        }
        ctrl.$onInit = function() {
            ctrl.status.showAllHistoryItemDetails = true;

            ctrl.status.isPaidInFull = isPaidInFull;

            ctrl.actions.showHistoryItemDetails = showHistoryItemDetails;
            ctrl.actions.showHistoryItemPayment = showHistoryItemPayment;
            ctrl.actions.showHideAllHistoryItemDetails = showHideAllHistoryItemDetails;
            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;
            ctrl.actions.refreshHistory = refreshHistory;

            ctrl.actions.copyToClipboard = copyToClipboard;
        }

        function generateHistoryObservationList(history) {
            var list = {};

            angular.forEach(history, function(iHistory, key) {
                angular.forEach(iHistory.performedServices, function(iPerformedServices) {
                    if(iPerformedServices.observations || list[key]) {
                        list[key] = true; 
                    } else {
                        list[key] = false;
                    }
                });
            });
            return list;
        }

        function generateHistoryDetailsList(history) {
            var list = {};

            angular.forEach(history, function(item, key) {
                list[item._id] = key === history.length - 1 ? true : false;
            });

            return list;
        }

        function isPaidInFull(payment) {
            if(payment) {
                var fullDiscount = payment.costProducts + payment.costServices === payment.discountTotal;
                var paidInFull = payment.total === payment.paidAmount;
                return fullDiscount || paidInFull;
            }
        }

        function showHistoryItemDetails(id, boolean) {
            ctrl.data.showHistoryItemDetails[id] = 
                typeof(boolean) === 'boolean' 
                    ? boolean 
                    : !ctrl.data.showHistoryItemDetails[id];
        }

        function showHistoryItemPayment(id, boolean) {
            ctrl.data.showHistoryItemPayment[id] = 
                typeof(boolean) === 'boolean' 
                    ? boolean 
                    : !ctrl.data.showHistoryItemPayment[id];
        }

        function showHideAllHistoryItemDetails(boolean) {

            angular.forEach(ctrl.data.showHistoryItemDetails, function(item, key) {
                ctrl.data.showHistoryItemDetails[key] = boolean;
            });
            ctrl.status.showAllHistoryItemDetails = !boolean;
        }

        function copyToClipboard(data, title) {
            UtilsService.copyToClipboard(data, title);
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