(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);

    function ClientHistoryDialogController($element, $mdDialog, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.historyItem = dialogData.historyItem;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.historyItem.date = ctrl.data.historyItem.date ? new Date(ctrl.data.historyItem.date) : new Date();

        ctrl.data.maxDate = new Date();

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(historyItem) {
            $mdDialog.hide(historyItem);
        };
    }

    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData'];
})();