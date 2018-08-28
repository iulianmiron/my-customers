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
        ctrl.data.maxDate = new Date();

        ctrl.actions.test = function () {
            console.log('buguguggug');
        }
        
        ctrl.actions.addService = addService;
        ctrl.actions.resetAddServiceForm = resetAddServiceForm;
        ctrl.actions.deleteSession = deleteSession;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;
        ctrl.actions.getTotalCost = getTotalCost;
        ctrl.actions.getTotalCostWithDiscount = getTotalCostWithDiscount;

        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        function resetAddServiceForm() {
            ctrl.data.newPerformedService = {}; 
        }

        function addService(newPerformedService) {
            if(!angular.isArray(ctrl.data.historyItem.performedServices)) {
                ctrl.data.historyItem.performedServices = []; 
            }
            ctrl.data.historyItem.performedServices.push(newPerformedService);

            resetAddServiceForm();
            console.log('ctrl.data.historyItem', ctrl.data.historyItem);
        }

        function deleteSession(historyItem) {
            $mdDialog.cancel({item: historyItem, command: 'delete'});
        }

        function cancel() {
            $mdDialog.cancel();
        };

        function save(historyItem) {
            console.log("save historyitem", historyItem);
            $mdDialog.hide(historyItem);
        };

        function changeSelectedServicesText(selectedServices) {
            return (selectedServices && selectedServices.length) 
                ? selectedServices.length > 1 
                    ? selectedServices.length + ' servicii selectate.'
                    : selectedServices.length + ' serviciu selectat'
                : 'Nu sunt servicii selectate';            
        };

        function getTotalCost(performedServices) {
            ctrl.data.newPerformedService.cost = performedServices.reduce(function(acc, curr) {
                return acc + curr.price;
            }, 0);

            getTotalCostWithDiscount(ctrl.data.newPerformedService.cost, ctrl.data.newPerformedService.discount);
        }

        function getTotalCostWithDiscount(cost, discount) {
            cost = cost || 0;
            discount = discount || 0;
            ctrl.data.newPerformedService.total = cost - discount;
        }
    }
})();