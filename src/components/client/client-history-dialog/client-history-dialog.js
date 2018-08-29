(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);

        
    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData', 'USERS'];
    function ClientHistoryDialogController($element, $mdDialog, dialogData, USERS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.users = USERS;
        ctrl.data.title = dialogData.title;
        ctrl.data.historyItem = dialogData.historyItem;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.historyItem.date = ctrl.data.historyItem.date ? new Date(ctrl.data.historyItem.date) : new Date();
        ctrl.data.historyItem.performedServices = ctrl.data.historyItem.performedServices || addServicesByStaff(ctrl.data.historyItem);
        ctrl.data.maxDate = new Date();
        ctrl.data.showCardContent = [];
        
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;
        ctrl.actions.setTotalCost = setTotalCost;
        ctrl.actions.setTotalCostWithDiscount = setTotalCostWithDiscount;
        ctrl.actions.addServicesByStaff = addServicesByStaff;
        ctrl.actions.deleteServicesByStaff = deleteServicesByStaff;
        ctrl.actions.showCardContent = showCardContent;
        ctrl.actions.deleteSession = deleteSession;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        function deleteSession(historyItem) {
            $mdDialog.cancel({item: historyItem, command: 'delete'});
        }

        function cancel() {
            $mdDialog.cancel();
        };

        function save(historyItem) {
            $mdDialog.hide(historyItem);
        };

        function changeSelectedServicesText(selectedServices) {
            return (selectedServices && selectedServices.length) 
                ? selectedServices.length > 1 
                    ? selectedServices.length + ' servicii selectate.'
                    : selectedServices.length + ' serviciu selectat'
                : 'Nu sunt servicii selectate';            
        };

        function setTotalCost(servicesByStaff) {
            servicesByStaff.cost = servicesByStaff.services.reduce(function(acc, curr) {
                return acc + curr.price;
            }, 0);

            setTotalCostWithDiscount(servicesByStaff);
        }

        function setTotalCostWithDiscount(servicesByStaff) {
            var cost = servicesByStaff.cost || 0;
            var discount = servicesByStaff.discount || 0;
            
            discount = discount > cost ? cost : discount;
            servicesByStaff.total = cost - discount;
        }

        function addServicesByStaff(historyItem) {
            historyItem.performedServices = angular.isArray(historyItem.performedServices) ? historyItem.performedServices : [];
            return historyItem.performedServices.push({});
        }

        function showCardContent(cardIndex) {
            ctrl.data.showCardContent[cardIndex] = !ctrl.data.showCardContent[cardIndex];
        }

        function deleteServicesByStaff(performedServices, index) {
            performedServices.splice(index, 1);
        }
    }
})();