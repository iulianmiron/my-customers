(function() {
    'use strict';

    angular
        .module('cm.components.settings.roles.roleDialog', [])
        .controller('RoleDialogController', RoleDialogController);
    
    RoleDialogController.$inject = ['$mdDialog', 'NO_PICTURE', 'dialogData'];
    function RoleDialogController($mdDialog, NO_PICTURE, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.noPicture = NO_PICTURE;
        ctrl.data.role = dialogData.role || {};
        ctrl.data.title = dialogData.title;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(role) {
            $mdDialog.hide(role);
        };
    }
})();