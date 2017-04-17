(function () {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {
                clientData: '<',
				historyData: '<',
                onAddHistoryItem: '&',
                onSelectHistoryItem: '&'
            }
        });

    function ClientHistoryController($element, moment, SERVICES) {
        var ctrl = this;
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

        ctrl.$onChanges = function(changes) {
            if(changes.clientData && changes.clientData.currentValue && !changes.clientData.isFirstChange()) { 
                ctrl.data.client = angular.copy(changes.clientData.currentValue); 
            }
			if(changes.historyData && changes.historyData.currentValue && !changes.historyData.isFirstChange()) { 
                ctrl.data.history = angular.copy(changes.historyData.currentValue); 
                angular.forEach(ctrl.data.history, function(iHistory) {
                    iHistory.date = new Date(iHistory.date);
                });
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.maxDate = new Date();
            ctrl.data.servicesTypes = prepareDropDown(SERVICES);
            ctrl.data.services = SERVICES;

            ctrl.actions.addNewHistoryItem = addNewHistoryItem;
            ctrl.actions.selectHistoryItem = selectHistoryItem;

            $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

            resetNewHistoryItemForm();

        }

        function prepareDropDown(services) {
            services = services.map(function(iService) { return iService.type; });
            return Array.from(new Set(services));
        }

        function resetNewHistoryItemForm() {
            ctrl.status.showNewHistoryItemForm = false;
            ctrl.data.newHistoryEntry = {};
            ctrl.data.newHistoryEntry.date = new Date();
        }

        function addNewHistoryItem(newHistoryEntry, client) {
            ctrl.onAddHistoryItem({ $event: { newHistoryEntry: newHistoryEntry, client: client }});
            resetNewHistoryItemForm();
        }   

        function selectHistoryItem(historyItem) {
            ctrl.onSelectHistoryItem({ $event: {historyItem: historyItem }});
            resetNewHistoryItemForm();
        }  
    }

    ClientHistoryController.$inject = ['$element', 'moment', 'SERVICES'];
})();