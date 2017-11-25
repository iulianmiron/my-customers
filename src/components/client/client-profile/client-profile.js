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

    function ClientProfileController($state, $log, $mdDialog, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES, ClientsDataService) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.actions = {};
        ctrl.status = {};

        ctrl.$onChanges = function(changes) {
            if (changes.clientData && changes.clientData.currentValue) {
                ctrl.data.client = angular.copy(changes.clientData.currentValue);
                ctrl.data.clientBackup = angular.copy(changes.clientData.currentValue);
                ctrl.data.client.age = ctrl.data.client.dateOfBirth ? calculateClientAge(ctrl.data.client.dateOfBirth): null;
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
            ctrl.data.maxDateOfBirth = new Date();

            ctrl.status.showMoreProfileDetails = false;

            ctrl.actions.editClient = editClient;

            ctrl.actions.setVIPData = setVIPData;
            ctrl.actions.checkIfDuplicate = checkIfDuplicate;
            ctrl.actions.calculateClientAge = calculateClientAge;
            ctrl.actions.saveClientProfile = saveClientProfile;
        }

        function calculateClientAge(dateOfBirth) {
            return moment().diff(moment(dateOfBirth), 'years') + ' ani';
        }

        function saveClientProfile(clientData) {
            ctrl.onSaveClientProfile({
                $event: { clientData: clientData }
            });
            ctrl.data.clientBackup = angular.copy(clientData);
            ctrl.status.editClient = false;
            ctrl.status.showMoreProfileDetails = false;
        }

        function editClient() {
            console.log('edit client');
        }

        function checkIfDuplicate(fieldName, fieldValue) {
            if(fieldName && fieldValue && (ctrl.data.newClient || (ctrl.data.clientBackup[fieldName] !== fieldValue))) {
                ClientsDataService
                    .searchClients(fieldValue)
                    .then(handleSuccess)
                    .catch(handleError);

                function handleSuccess(rClients) {
                    if(rClients.length) {
                        var client = rClients.filter(function(iClient) {
                            return iClient[fieldName] === fieldValue;
                        })[0];
                        
                        showDuplicateAccountDialog(null, client, fieldName);
                    }
                }

                function handleError(rErrorMessage) {
                    $log.error('Could not get clients', rErrorMessage);
                }
            }
        }

        function showDuplicateAccountDialog(ev, client, fieldName) {

            var confirm = $mdDialog.confirm()
                  .title('Clientul cu: ' + (fieldName === 'phoneNumber' ? client.phoneNumber : client.email ) + ' exista deja.')
                  .textContent('Detalii client: ' + client.firstName + ' ' + client.lastName)
                  .ariaLabel('Client existent.')
                  .targetEvent(ev)
                  .ok('Deschide profil: ' + client.firstName + ' ' + client.lastName)
                  .cancel('Inapoi');
        
            $mdDialog.show(confirm).then(function() {
                $state.go('client', {id: client._id});
            }, function() {
                ctrl.data.client[fieldName] = !!ctrl.data.newClient ? null : ctrl.data.clientBackup[fieldName];
            });
        };

        function setVIPData(client) {
            client.vip = client.isVip ? client.vip : null;
        }
    }

    ClientProfileController.$inject = ['$state', '$log', '$mdDialog', 'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES', 'ClientsDataService'];
})();