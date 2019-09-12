(function() {
    'use strict';

    angular
        .module('cm.components.clientProfileDialog', [])
        .controller('ClientProfileDialogController', ClientProfileDialogController);

        
    ClientProfileDialogController.$inject = ['$rootElement', '$state', '$mdDialog', 'dialogData', 'ClientsDataService', 'HotkeyService', 'UtilsService'];
    function ClientProfileDialogController($rootElement, $state, $mdDialog, dialogData, ClientsDataService, HotkeyService, UtilsService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.staff = dialogData.staff;
        ctrl.data.client = dialogData.client || {};
        ctrl.data.client.age = ctrl.data.client.dateOfBirth ? calculateClientAge(ctrl.data.client.dateOfBirth) : null;
        ctrl.data.clientVip = dialogData.clientVip;
        ctrl.data.maxDateOfBirth = new Date();
                
        ctrl.actions.setVIPData = setVIPData;
        ctrl.actions.calculateClientAge = calculateClientAge;
        ctrl.actions.updateClientRelation = updateClientRelation;
        ctrl.actions.removeAltPhone = removeAltPhone;
        ctrl.actions.checkIfDuplicate = checkIfDuplicate;
        ctrl.actions.deleteClient = deleteClient;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;     
        
        HotkeyService.save(saveClient);

        function saveClient(event) {
            event.preventDefault();
            if(!ctrl.data.clientProfileForm.$invalid) {
                ctrl.actions.save(ctrl.data.client);
            } 
        }

        function calculateClientAge(dateOfBirth) {
            return ctrl.data.client.age = UtilsService.getAge(dateOfBirth) + ' ani';
        }

        function setVIPData(client) {
            client.vip = client.isVip ? client.vip : null;
        }

        function removeAltPhone() {
            ctrl.data.client.altPhoneNumber = null;
            ctrl.status.showAltPhone = false;
            updateClientRelation();
        }

        function updateClientRelation(altPhoneNumber) {
            ctrl.data.client.altPhoneNumberRelation = altPhoneNumber ? ctrl.data.client.altPhoneNumberRelation : null;
        }

        function checkIfDuplicate(fieldName, fieldValue) {
            if(fieldName && fieldValue && (ctrl.data.client || (ctrl.data.client[fieldName] !== fieldValue))) {
                ClientsDataService
                    .searchAll(fieldValue)
                    .then(handleSuccess)
                    .catch(handleError);

                function handleSuccess(rClients) {
                    if(rClients.length) {
                        var client = rClients.filter(function(iClient) {
                            return iClient[fieldName] === fieldValue;
                        })[0];

                        if(client && client._id !== ctrl.data.client._id) {
                            showDuplicateAccountDialog(client, fieldName);
                        }
                    }
                }

                function handleError(rErrorMessage) {
                    console.error('Could not get clients', rErrorMessage);
                }
            }
        }

        function showDuplicateAccountDialog(client, fieldName) {
            var dialogData = {
                title: 'Clientul cu: ' + client[fieldName] + ' exista deja.',
                textContent: 'Detalii client: ' + client.firstName + ' ' + client.lastName,
                okText: 'Deschide Profil: ' + client.firstName + ' ' + client.lastName
            };

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
                ctrl.actions.cancel(client);
                $state.go('client', {id: client._id});
            }, function() {
                ctrl.data.client[fieldName] = null;
            });

        };

        function deleteClient(client) {
            $mdDialog.cancel({item: client, command: 'delete'});
        }

        function cancel(client) {
            $mdDialog.cancel({item: client, command: 'cancel'});
        };

        function save(client) {
            $mdDialog.hide(client);
        };
    }

})();