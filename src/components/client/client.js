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

    function ClientController($q, $state, $log, $mdDialog, $rootElement, ClientServices, HistoryServices, ServicesServices, toastr) {
        var ctrl = this;

        ctrl.$onInit = function() {

            ctrl.data = {};
            ctrl.status = {};
            ctrl.actions = {};

            ctrl.data.clientId = ctrl.transition.params("to").id;
            ctrl.data.newClient = false;

            if (ctrl.data.clientId !== 0) {
                $q.all([getClientProfile(ctrl.data.clientId), getClientHistory(ctrl.data.clientId)]).then(function() {});
            } else if (ctrl.data.clientId === 0) {
                ctrl.data.newClient = true;
            }
            getAllServices();

            ctrl.actions.saveClientProfile = saveClientProfile;
            ctrl.actions.getClientProfile = getClientProfile;
            ctrl.actions.addHistoryItem = addHistoryItem;
            ctrl.actions.editHistoryItem = editHistoryItem;

        }

        function getClientProfile(clientId) {
            ClientServices.getClient(clientId).then(function(rClientProfile) {
                ctrl.data.client = rClientProfile;
                ctrl.data.clientBackup = rClientProfile;
            });
        }

        function getAllServices() {
            ServicesServices.getAllServices().then(function(rServices) {
                ctrl.data.allServices = rServices;
            });
        }

        function saveClientProfile(event) {
            if (!event.clientData._id) { addNewClient(event.clientData); } else { updateClient(event.clientData); }
        }

        function addNewClient(client) {
            ClientServices.addClient(client).then(function(rClientAdded) {
                toastr.success("Client adaugat", "Succes");
                $state.go('client', { id: rClientAdded._id });
            });
        }

        function updateClient(client) {
            ClientServices.updateClient(client).then(function(rSuccess) {
                toastr.success("Client editat", "Succes");
            });
        }

        function getClientHistory(clientId) {
            HistoryServices.getClientHistory(clientId).then(function(rClientHistory) {
                ctrl.data.history = rClientHistory;
            });
        }

        function addHistoryItem(event) {
            var clientData = event.client;
            var newHistoryEntry = event.newHistoryEntry;
            newHistoryEntry._clientId = clientData._id;

            HistoryServices.addHistoryItem(newHistoryEntry).then(function(rHistoryAdded) {
                toastr.success("Sedinta adaugata", "Succes");
                getClientHistory(clientData._id);
            });
        }

        function editHistoryItem(event) {
            var historyItem = event.historyItem;
            var dialogData = {
                historyItem: historyItem ? angular.copy(historyItem) : null,
                title: 'Editati sedinta',
                services: ctrl.data.allServices
            };

            showDialog(event.event, dialogData, saveEditedHistoryItem);
        }

        function saveEditedHistoryItem(historyItem) {
            HistoryServices.editHistoryItem(historyItem).then(function(rSuccess) {
                toastr.success("Sedinta editata", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }



////////////////////////////////////////////////////////////////////////////////


        function addConsumable(event) {
            var consumable = consumable;
            var dialogData = {
                consumable: consumable ? angular.copy(consumable) : null,
                title: 'Adaugati consumabil nou'
            };
            showDialog(event, dialogData, saveNewConsumable);
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
                fullscreen: false
            }).then(function(historyItem) {
                cb(historyItem);
            }, function() {
                //historyItem action cancelled
            });
        }


    }

    ClientController.$inject = ['$q', '$state', '$log', '$mdDialog', '$rootElement', 'ClientServices', 'HistoryServices', 'ServicesServices', 'toastr'];
})();