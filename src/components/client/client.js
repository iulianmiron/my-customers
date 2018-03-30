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
    ClientController.$inject = [
        '$mdToast', '$q', '$state', '$log', '$mdDialog', '$rootElement', 
        'ClientsDataService', 'HistoryDataService', 'ServicesDataService', 'ServiceTypesDataService', 
        'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES',
        'toastr'
    ];
    function ClientController(
        $mdToast, $q, $state, $log, $mdDialog, $rootElement, 
        ClientsDataService, HistoryDataService, ServicesDataService, ServiceTypesDataService, CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES, 
        toastr
    ) {
        var ctrl = this;

        ctrl.$onInit = function() {

            ctrl.data = {};
            ctrl.status = {};
            ctrl.actions = {};

            ctrl.data.clientId = ctrl.transition.params("to").id;
            ctrl.data.newClient = ctrl.data.clientId === '0' ? true : false;
            ctrl.data.clientVip = {
                levels: CLIENT_VIP_LEVELS,
                types: CLIENT_VIP_TYPES
            };

            ctrl.data.previousPage =  {
                name: ctrl.transition.from().name || 'home',
                paramName: Object.keys(ctrl.transition.params('from'))[1] || null,
                paramValue: ctrl.transition.params('from')[Object.keys(ctrl.transition.params('from'))[1]] || null
            };
            ctrl.actions.getClientProfile   = getClientProfile;
            ctrl.actions.addClient          = addClient;
            ctrl.actions.editClient         = editClient;

            ctrl.actions.addHistoryItem     = addHistoryItem;
            ctrl.actions.editHistoryItem    = editHistoryItem;

            $q.all([
                getAllServices(), 
                getAllServiceTypes()
            ]).then(function(data) {
                ctrl.data.allServices = data[0];
                ctrl.data.allServiceTypes = data[1];
            });

            if (ctrl.data.clientId !== '0') {
                $q.all([
                    getClientProfile(ctrl.data.clientId), 
                    getClientHistory(ctrl.data.clientId)
                ]).then(function() {});
            } else {
                addClient();
            }     
        }
        
        function getAllServices()       { return ServicesDataService.getAll(); }
        function getAllServiceTypes()   { return ServiceTypesDataService.getAll(); }

        function getClientProfile(clientId) { 
            ClientsDataService.getOne(clientId).then(function(rClient) {
                ctrl.data.client = rClient;
            }); 
        }

        function getClientHistory(clientId) { 
            HistoryDataService.getAllById(clientId).then(function(rHistory) {
                ctrl.data.history = rHistory;
            }); 
        }

        function addClient() {
            var dialogData = {
                client: null,
                title: 'Adaugati client',
                clientVip: ctrl.data.clientVip
            };
            showClientProfileDialog(null, dialogData, addNewClient);
        }

        function editClient(event) {
            var dialogData = {
                client: event.client ? angular.copy(event.client) : null,
                title: 'Editati client',
                clientVip: ctrl.data.clientVip
            };
            showClientProfileDialog(event.event, dialogData, updateClient);
        }

        function addNewClient(client) {
            ClientsDataService.addNew(client).then(function(rClientAdded) {
                toastr.success("Client adaugat", "Succes");
                $state.go('client', { id: rClientAdded._id });
            });
        }

        function updateClient(client) {
            ClientsDataService.updateOne(client).then(function(rSuccess) {
                toastr.success("Client editat", "Succes");
                getClientProfile(client._id);
            });
        }

        function showClientProfileDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ClientProfileDialogController',
                controllerAs: '$ctrl',
                templateUrl: 'components/client/client-profile-dialog/client-profile-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(client) {
                cb(client);
            }, function(client) {
                if(!client || !client._id) {
                    $state.go(ctrl.data.previousPage.name, {[ctrl.data.previousPage.paramName]: ctrl.data.previousPage.paramValue});
                }
            });
        }


//////////////////history/////////////////////////////////


        function addHistoryItem(event) {
            var dialogData = {
                historyItem: {
                    _clientId: ctrl.data.clientId
                },
                title: 'Adaugati sedinta',
                services: ctrl.data.allServices,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showHistoryDialog(event.event, dialogData, saveNewHistoryItem);
        }

        function editHistoryItem(event) {
            var historyItem = event.historyItem;
            var dialogData = {
                historyItem: historyItem ? angular.copy(historyItem) : null,
                title: 'Editati sedinta',
                services: ctrl.data.allServices,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showHistoryDialog(event.event, dialogData, saveEditedHistoryItem);
        }

        function saveNewHistoryItem(historyItem) {
            HistoryDataService.addNew(historyItem).then(function(rSuccess) {
                toastr.success("Sedinta adaugata", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }

        function saveEditedHistoryItem(historyItem) {
            HistoryDataService.updateOne(historyItem).then(function(rSuccess) {
                toastr.success("Sedinta editata", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }

        function showHistoryDialog(event, dialogData, cb) {
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

})();