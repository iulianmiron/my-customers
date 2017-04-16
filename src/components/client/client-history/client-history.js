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
                onAddHistoryItem: '&'
            }
        });

    function ClientHistoryController($element, SERVICES) {
        var ctrl = this;
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

        ctrl.$onChanges = function(changes) {
            if(changes.clientData) { ctrl.data.client = angular.copy(changes.clientData.currentValue); }
			if(changes.historyData) { ctrl.data.history = angular.copy(changes.historyData.currentValue); }
        }
        ctrl.$onInit = function() {
            ctrl.data.maxDate = new Date();
            ctrl.data.newHistoryEntry = {};
            ctrl.data.newHistoryEntry.date = ctrl.data.maxDate;
            ctrl.data.servicesTypes = prepareDropDown(SERVICES);
            ctrl.data.services = SERVICES;

            ctrl.status.showNewHistoryItemForm = true;

            ctrl.actions.addNewHistoryItem = addNewHistoryItem;

            $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        }

        function prepareDropDown(services) {
            services = services.map(function(iService) { return iService.type; });
            return Array.from(new Set(services));
        }

        function addNewHistoryItem(newHistoryEntry, client) {
            ctrl.status.showNewHistoryItemForm = false;
            ctrl.onAddHistoryItem({ $event: { newHistoryEntry: newHistoryEntry, client: client }});
        }     
    }

    ClientHistoryController.$inject = ['$element', 'SERVICES'];
})();