(function() {
    'use strict';

    angular
        .module('cm.components.settings.roles', [])
        .component('roles', {
            templateUrl: '/components/settings/roles/roles.html',
            controller: RolesController,
            bindings: {}
        });

    RolesController.$inject = ['$mdDialog', '$rootElement', 'RolesDataService', 'toastr', 'NO_PICTURE'];
    function RolesController($mdDialog, $rootElement, RolesDataService, toastr, NO_PICTURE) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.noPicture = NO_PICTURE;

            ctrl.actions.getAllRoles = getAllRoles;
            ctrl.actions.addRole = addRole;
            ctrl.actions.editRole = editRole;
            ctrl.actions.deleteRole = deleteRole;
            ctrl.actions.saveEditedRole = saveEditedRole;
           
            getAllRoles();
        }

        function getAllRoles() {
            RolesDataService.getAll().then(function(rRoles) {
                ctrl.data.allRoles = rRoles;
            });
        }

        function saveNewRole(newRole) {
            RolesDataService.addNew(newRole).then(function(rSuccess) {
                toastr.success("Rol adaugat cu succes");
                return rSuccess.data;
            });
            getAllRoles();
        }
        
        function saveEditedRole(role) {
            RolesDataService.updateOne(role).then(function(rSuccess) {
                toastr.success("Rol editat cu succes");
                return rSuccess.data;
            });
            getAllRoles();
        }

        function deleteRole(roleId) {
            RolesDataService.deleteOne(roleId).then(function(rSuccess) {
                toastr.success("Rol sters cu succes");
                return rSuccess.data;
            });
            getAllRoles();
        }

        function editRole(event, role) {
            var role = role;
            var dialogData = {
                role: role ? angular.copy(role) : null,
                title: 'Editeaza rol'
            };

            showDialog(event, dialogData, saveEditedRole);
        }

        function addRole(event) {
            var role = role;
            var dialogData = {
                role: role ? angular.copy(role) : null,
                title: 'Adauga rol nou'
            };
            showDialog(event, dialogData, saveNewRole);
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'RoleDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/settings/roles/role-dialog/role-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(role) {
                cb(role);
            }, function() {
                //role edit cancelled
            });
        }
    }
})();