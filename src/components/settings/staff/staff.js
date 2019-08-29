(function() {
    'use strict';

    angular
        .module('cm.components.settings.staff', [])
        .component('staff', {
            templateUrl: '/components/settings/staff/staff.html',
            controller: StaffController,
            bindings: {}
        });

    StaffController.$inject = ['$q', '$mdDialog', '$rootElement', 'StaffDataService', 'RolesDataService', 'toastr', 'NO_PICTURE'];
    function StaffController($q, $mdDialog, $rootElement, StaffDataService, RolesDataService, toastr, NO_PICTURE) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.noPicture = NO_PICTURE;

            ctrl.actions.getAllStaff = getAllStaff;
            ctrl.actions.addStaff = addStaff;
            ctrl.actions.editStaff = editStaff;
            ctrl.actions.deleteStaff = deleteStaff;
            ctrl.actions.saveEditedStaff = saveEditedStaff;

            $q.all([getAllStaff(), getAllRoles()]).then(function(data) {
                //data received
            });
        }

        function getAllStaff() {
            StaffDataService.getAll().then(function(rStaff) {
                ctrl.data.allStaff = rStaff;
            });
        }

        function getAllRoles() {
            RolesDataService.getAll().then(function(rRoles) {
                ctrl.data.allRoles = rRoles;
            });
        }

        function saveNewStaff(newStaff) {
            StaffDataService.addNew(newStaff).then(function(rSuccess) {
                toastr.success("Personal adaugat cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }
        
        function saveEditedStaff(staff) {
            StaffDataService.updateOne(staff).then(function(rSuccess) {
                toastr.success("Personal editat cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }

        function deleteStaff(staffId) {
            StaffDataService.deleteOne(staffId).then(function(rSuccess) {
                toastr.success("Personal sters cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }

        function editStaff(event, staff) {
            var staff = staff;
            var dialogData = {
                staff: staff ? angular.copy(staff) : null,
                roles: ctrl.data.allRoles,
                title: 'Editeaza personal'
            };

            showDialog(event, dialogData, saveEditedStaff);
        }

        function addStaff(event) {
            var staff = staff;
            var dialogData = {
                staff: staff ? angular.copy(staff) : null,
                roles: ctrl.data.allRoles,
                title: 'Adauga personal nou'
            };
            showDialog(event, dialogData, saveNewStaff);
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'StaffDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/settings/staff/staff-dialog/staff-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(staff) {
                cb(staff);
            }, function() {
                //staff edit cancelled
            });
        }
    }
})();