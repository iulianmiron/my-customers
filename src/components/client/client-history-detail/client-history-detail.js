(function () {
    'use strict';

    angular
        .module('cm.components.clientHistoryDetail', [])
        .component('clientHistoryDetail', {
            templateUrl: '/components/client/client-history-detail/client-history-detail.html',
            controller: ClientHistoryDetailController,
            bindings: {
                historyItemData: '<',
                services: '<',
                onEditHitoryItem: '&'
            }
        });

    function ClientHistoryDetailController ($element, SERVICE_TYPES) {
    	var ctrl = this;
        
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if(changes.historyItemData && changes.historyItemData.currentValue && !changes.historyItemData.isFirstChange()) { 
                ctrl.data.historyItemBackup = angular.copy(changes.historyItemData.currentValue); 
                ctrl.data.historyItem = angular.copy(changes.historyItemData.currentValue); 
                ctrl.data.historyItem.date = new Date(ctrl.data.historyItem.date);
            }
            if(changes.services && changes.services.currentValue && !changes.services.isFirstChange()) { 
                ctrl.data.services = angular.copy(changes.services.currentValue); 
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.maxDate = new Date();
            ctrl.data.servicesTypes = prepareDropDown(SERVICE_TYPES);

            ctrl.status.editHistoryItemForm = false;

            ctrl.actions.editHistoryItem = editHistoryItem;
            ctrl.actions.revertChanges = revertChanges;

            $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });
        }

        function prepareDropDown(serviceTypes) {
            return serviceTypes.map(function(iServiceType) { return iServiceType.name; });
        }

        function editHistoryItem(historyItem) {
            var dateString = historyItem.date.toString();
            historyItem.date = dateString;
            ctrl.onEditHitoryItem({ $event: { historyItem: historyItem} });
            ctrl.status.editHistoryItemForm = false;
        }

        function revertChanges() {
            ctrl.status.editHistoryItemForm = false;
            ctrl.data.historyItem = angular.copy(ctrl.data.historyItemBackup); 
            ctrl.data.historyItem.date = new Date(ctrl.data.historyItem.date);
        }
    }

    ClientHistoryDetailController.$inject = ['$element', 'SERVICE_TYPES'];
})();