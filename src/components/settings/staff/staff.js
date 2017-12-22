(function() {
    'use strict';

    angular
        .module('cm.components.settings.staff', [])
        .component('staff', {
            templateUrl: '/components/settings/staff/staff.html',
            controller: StaffController,
            bindings: {}
        });

    StaffController.$inject = ['$mdDialog', '$rootElement', 'StaffDataService', 'toastr', 'NO_PICTURE'];
    function StaffController($mdDialog, $rootElement, StaffDataService, toastr, NO_PICTURE) {
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
           
            getAllStaff();
        }

        function getAllStaff() {
            StaffDataService.getAllStaff().then(function(rStaff) {
                ctrl.data.allStaff = rStaff;
            });
        }

        function saveNewStaff(newStaff) {
            StaffDataService.addStaff(newStaff).then(function(rSuccess) {
                toastr.success("Angajat adaugat cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }
        
        function saveEditedStaff(staff) {
            StaffDataService.updateStaff(staff).then(function(rSuccess) {
                toastr.success("Angajat editat cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }

        function deleteStaff(staffId) {
            StaffDataService.deleteStaff(staffId).then(function(rSuccess) {
                toastr.success("Angajat sters cu succes");
                return rSuccess.data;
            });
            getAllStaff();
        }

        function editStaff(event, staff) {
            var staff = staff;
            var dialogData = {
                staff: staff ? angular.copy(staff) : null,
                title: 'Editati angajat'
            };

            showDialog(event, dialogData, saveEditedStaff);
        }

        function addStaff(event) {
            var staff = staff;
            var dialogData = {
                staff: staff ? angular.copy(staff) : null,
                title: 'Adaugati angajat nou'
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
                fullscreen: false
            }).then(function(staff) {
                cb(staff);
            }, function() {
                //staff edit cancelled
            });
        }
    }
})();