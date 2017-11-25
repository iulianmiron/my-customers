(function() {
    'use strict';

    angular
        .module('cm.components.client', [])
        .component('client', {
            templateUrl: '/components/client/client.html',
            controller: ClientController,
            bindings: {
                transition: '<$transition$'
            }
        });

    function ClientController($mdToast, $q, $state, $log, $mdDialog, $rootElement, ClientsDataService, HistoryDataService, ServicesDataService, ServiceTypesDataService, toastr) {
        var ctrl = this;

        ctrl.$onInit = function() {

            ctrl.data = {};
            ctrl.status = {};
            ctrl.actions = {};

            ctrl.data.clientId = ctrl.transition.params("to").id;
            ctrl.data.newClient = false;

            if (ctrl.data.clientId !== '0') {
                $q.all([getClientProfile(ctrl.data.clientId), getClientHistory(ctrl.data.clientId)]).then(function() {});
            } else if (ctrl.data.clientId === '0') {
                ctrl.data.newClient = true;
            }

            $q.all([getAllServices(), getAllServiceTypes()]).then(function() {

            }).finally(function() {
                // $mdToast.showSimple('Hello');
                // toastr.success('test');
            });
           

            ctrl.actions.saveClientProfile = saveClientProfile;
            ctrl.actions.getClientProfile = getClientProfile;
            ctrl.actions.addHistoryItem = addHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;

        }

        function getClientProfile(clientId) {
            ClientsDataService.getClient(clientId).then(function(rClientProfile) {
                ctrl.data.client = rClientProfile;
                ctrl.data.clientBackup = rClientProfile;
            });
        }

        function getAllServices() {
            ServicesDataService.getAllServices().then(function(rServices) {
                ctrl.data.allServices = rServices;
            });
        }

        function getAllServiceTypes() {
            ServiceTypesDataService.getAllServiceTypes().then(function(rServiceTypes) {
                ctrl.data.allServiceTypes = rServiceTypes;
            });
        }

        function saveClientProfile(event) {
            event.clientData._id ? updateClient(event.clientData) : addNewClient(event.clientData);
        }

        function addNewClient(client) {
            ClientsDataService.addClient(client).then(function(rClientAdded) {
                toastr.success("Client adaugat", "Succes");
                $state.go('client', { id: rClientAdded._id });
            });
        }

        function updateClient(client) {
            ClientsDataService.updateClient(client).then(function(rSuccess) {
                toastr.success("Client editat", "Succes");
            });
        }

        function getClientHistory(clientId) {
            HistoryDataService.getClientHistory(clientId).then(function(rClientHistory) {
                ctrl.data.history = rClientHistory;
            });
        }

        function addHistoryItem(event) {
            var dialogData = {
                historyItem: {
                    _clientId: ctrl.data.clientId
                },
                title: 'Adaugati sedinta',
                services: ctrl.data.allServices,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showDialog(event.event, dialogData, saveNewHistoryItem);
        }

        function editHistoryItem(event) {
            var historyItem = event.historyItem;
            var dialogData = {
                historyItem: historyItem ? angular.copy(historyItem) : null,
                title: 'Editati sedinta',
                services: ctrl.data.allServices,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showDialog(event.event, dialogData, saveEditedHistoryItem);
        }

        function saveNewHistoryItem(historyItem) {
            HistoryDataService.addHistoryItem(historyItem).then(function(rSuccess) {
                toastr.success("Sedinta adaugata", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }

        function saveEditedHistoryItem(historyItem) {
            HistoryDataService.editHistoryItem(historyItem).then(function(rSuccess) {
                toastr.success("Sedinta editata", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ClientHistoryDialogController',
                controllerAs: '$ctrl',
                templateUrl: 'components/client/client-history-dialog/client-history-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(historyItem) {
                cb(historyItem);
            }, function() {
                //historyItem action cancelled
            });
        }
    }

    ClientController.$inject = ['$mdToast', '$q', '$state', '$log', '$mdDialog', '$rootElement', 'ClientsDataService', 'HistoryDataService', 'ServicesDataService', 'ServiceTypesDataService', 'toastr'];
})();