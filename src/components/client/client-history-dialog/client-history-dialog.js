(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);

        
    ClientHistoryDialogController.$inject = ['$timeout', '$element', '$mdDialog', 'dialogData', 'USERS'];
    function ClientHistoryDialogController($timeout, $element, $mdDialog, dialogData, USERS) {
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
        
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });
       
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
        }
    }
})();