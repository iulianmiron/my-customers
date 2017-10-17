(function() {
    'use strict';

    angular
        .module('cm.components.clientProfile', [])
        .component('clientProfile', {
            templateUrl: '/components/client/client-profile/client-profile.html',
            controller: ClientProfileController,
            bindings: {
                newClient: '<',
                clientData: '<',
                onSaveClientProfile: '&'
            }
        });

    function ClientProfileController($state, $log, $mdDialog, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES, SearchClientsServices) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
                ctrl.data.clientBackup = angular.copy(changes.clientData.currentValue);
            }
            if (changes.newClient && changes.newClient.currentValue) {
                ctrl.data.newClient = angular.copy(changes.newClient.currentValue);
                ctrl.status.editClient = !!ctrl.data.newClient;
            }
        }
        ctrl.$onInit = function() {
            ctrl.data.clientVip = {
                levels: CLIENT_VIP_LEVELS,
                types: CLIENT_VIP_TYPES
            };

            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.setVIPData = setVIPData;
            ctrl.actions.checkIfDuplicateNumber = checkIfDuplicateNumber;
            ctrl.actions.saveClientProfile = saveClientProfile;
            ctrl.actions.resetForm = resetForm;
        }

        function saveClientProfile(clientData) {
            ctrl.onSaveClientProfile({
                $event: { clientData: clientData }
            });
            ctrl.data.clientBackup = angular.copy(clientData);
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;
        }

        function checkIfDuplicateNumber(clientPhoneNumber) {
            if(ctrl.data.newClient || (clientPhoneNumber && (ctrl.data.clientBackup && ctrl.data.clientBackup.phoneNumber !== clientPhoneNumber))) {
                SearchClientsServices
                .searchClients(clientPhoneNumber)
                .then(handleSuccess)
                .catch(handleError);

                function handleSuccess(rClients) {
                    if(rClients.length) {
                        showDuplicateAccountDialog(null, rClients[0]);
                    }
                }

                function handleError(rErrorMessage) {
                    $log.error('Could not get clients', rErrorMessage);
                }
            }
        }

        function showDuplicateAccountDialog(ev, client) {

            var confirm = $mdDialog.confirm()
                  .title('Clientul cu: ' + client.phoneNumber + ' exista deja.')
                  .textContent('Detalii client: ' + client.firstName + ' ' + client.lastName)
                  .ariaLabel('Client existent.')
                  .targetEvent(ev)
                  .ok('Deschide profil: ' + client.firstName + ' ' + client.lastName)
                  .cancel('Inapoi');
        
            $mdDialog.show(confirm).then(function() {
                $state.go('client', {id: client._id});
            }, function() {
                debugger;
                ctrl.data.client.phoneNumber = !!ctrl.data.newClient ? null : ctrl.data.clientBackup.phoneNumber;
            });
          };

        function setVIPData(client) {
            client.vip = client.isVip ? client.vip : null;
        }

        function resetForm() {
            ctrl.status.editClient = false;
            ctrl.data.client = angular.copy(ctrl.data.clientBackup);
        }
    }

    ClientProfileController.$inject = ['$state', '$log', '$mdDialog', 'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES', 'SearchClientsServices'];
})();