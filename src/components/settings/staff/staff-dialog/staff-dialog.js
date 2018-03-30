(function() {
    'use strict';

    angular
        .module('cm.components.settings.staff.staffDialog', [])
        .controller('StaffDialogController', StaffDialogController);
    
    StaffDialogController.$inject = ['$rootElement', '$mdDialog', 'NO_PICTURE', 'dialogData', 'StaffDataService', 'UtilsService'];
    function StaffDialogController($rootElement, $mdDialog, NO_PICTURE, dialogData, StaffDataService, UtilsService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.noPicture = NO_PICTURE;
        ctrl.data.staff = dialogData.staff || {};
        ctrl.data.staff.age = ctrl.data.staff.dateOfBirth ? calculateStaffAge(ctrl.data.staff.dateOfBirth): null;
        ctrl.data.title = dialogData.title;
        ctrl.data.roles = dialogData.roles;
        ctrl.data.selectedRoles = UtilsService.getSelectedItems(ctrl.data.roles, ctrl.data.staff.roles);
        ctrl.data.maxDateOfBirth = new Date();

        ctrl.actions.calculateStaffAge = calculateStaffAge;
        ctrl.actions.checkIfDuplicate = checkIfDuplicate;
        ctrl.actions.getSelectedItems = UtilsService.getSelectedItems;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        function checkIfDuplicate(fieldName, fieldValue) {
            if(fieldName && fieldValue && (ctrl.data.staff || (ctrl.data.staff[fieldName] !== fieldValue))) {
                StaffDataService
                    .searchAll(fieldValue)
                    .then(handleSuccess)
                    .catch(handleError);

                function handleSuccess(rStaff) {
                    if(rStaff.length) {
                        var staff = rStaff.filter(function(iStaff) {
                            return iStaff[fieldName] === fieldValue;
                        })[0];
                        
                        showDuplicateAccountDialog(staff, fieldName);
                    }
                }

                function handleError(rErrorMessage) {
                    console.error('Could not get staff', rErrorMessage);
                }
            }
        }

        function showDuplicateAccountDialog(staff, fieldName) {

            var dialogData = {
                title: 'Angajatul cu: ' + staff[fieldName] + ' exista deja.',
                textContent: 'Detalii angajat: ' + staff.firstName + ' ' + staff.lastName,
                okText: 'OK'
            }

            $mdDialog.show({
                controller: 'ConfirmDialogController',
                controllerAs: '$ctrl',
                templateUrl: 'components/common/confirm-dialog/confirm-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: null,
                clickOutsideToClose: false,
                multiple: true
            }).then(function() {
                ctrl.data.staff[fieldName] = null;
            }, function() {
                ctrl.data.staff[fieldName] = null;
            });

        };
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(staff) {
            $mdDialog.hide(staff);
        };

        function calculateStaffAge(dateOfBirth) {
            return ctrl.data.staff.age = moment().diff(moment(dateOfBirth), 'years') + ' ani';
        }
    }
})();