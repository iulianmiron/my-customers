(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);

    function ClientHistoryDialogController($element, $mdDialog, dialogData, SERVICE_TYPES, USERS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.historyItem = dialogData.historyItem;
        ctrl.data.services = dialogData.services;
        ctrl.data.historyItem.date = ctrl.data.historyItem.date ? new Date(ctrl.data.historyItem.date) : new Date();

        ctrl.data.maxDate = new Date();
        ctrl.data.servicesTypes = prepareDropDown(SERVICE_TYPES);
        ctrl.data.users = USERS;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        function prepareDropDown(serviceTypes) {
            return serviceTypes.map(function(iServiceType) { return iServiceType.name; });
        }
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(historyItem) {
            $mdDialog.hide(historyItem);
        };
    }

    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData', 'SERVICE_TYPES', 'USERS'];
})();