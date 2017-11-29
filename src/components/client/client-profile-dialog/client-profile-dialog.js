(function() {
    'use strict';

    angular
        .module('cm.components.clientProfileDialog', [])
        .controller('ClientProfileDialogController', ClientProfileDialogController);

        
    ClientProfileDialogController.$inject = ['$rootElement', '$state', '$mdDialog', 'dialogData', 'ClientsDataService'];
    function ClientProfileDialogController($rootElement, $state, $mdDialog, dialogData, ClientsDataService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.client = dialogData.client || {};
        ctrl.data.client.age = ctrl.data.client.dateOfBirth ? calculateClientAge(ctrl.data.client.dateOfBirth): null;
        
        ctrl.data.clientVip = dialogData.clientVip;

        ctrl.data.maxDateOfBirth = new Date();

        ctrl.actions.setVIPData = setVIPData;
        ctrl.actions.calculateClientAge = calculateClientAge;
        ctrl.actions.checkIfDuplicate = checkIfDuplicate;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
       
        function calculateClientAge(dateOfBirth) {
            return ctrl.data.client.age = moment().diff(moment(dateOfBirth), 'years') + ' ani';
        }

        function setVIPData(client) {
            client.vip = client.isVip ? client.vip : null;
        }

        function checkIfDuplicate(fieldName, fieldValue) {
            if(fieldName && fieldValue && (ctrl.data.client || (ctrl.data.client[fieldName] !== fieldValue))) {
                ClientsDataService
                    .searchClients(fieldValue)
                    .then(handleSuccess)
                    .catch(handleError);

                function handleSuccess(rClients) {
                    if(rClients.length) {
                        var client = rClients.filter(function(iClient) {
                            return iClient[fieldName] === fieldValue;
                        })[0];
                        
                        showDuplicateAccountDialog(client, fieldName);
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
                okText: 'Deschide Profil: ' + client.firstName + ' ' + client.lastName,
                clientId: client._id
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
                $state.go('client', {id: client._id});
                ctrl.actions.cancel();
            }, function() {
                ctrl.data.client[fieldName] = null;
            });

        };

        function cancel(client) {
            $mdDialog.cancel(client);
        };

        function save(client) {
            $mdDialog.hide(client);
        };
    }

})();