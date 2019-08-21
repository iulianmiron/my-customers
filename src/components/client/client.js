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
        '$q', '$state', '$mdDialog', '$rootElement',
        'ClientsDataService', 'HistoryDataService', 'ServicesDataService', 'ServiceTypesDataService', 'StaffDataService',
        'CLIENT_VIP_LEVELS', 'CLIENT_VIP_TYPES',
        'toastr', 
    ];
    function ClientController(
        $q, $state, $mdDialog, $rootElement,
        ClientsDataService, HistoryDataService, ServicesDataService, ServiceTypesDataService, StaffDataService,
        CLIENT_VIP_LEVELS, CLIENT_VIP_TYPES,
        toastr, 
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

            ctrl.data.previousState = setPreviousState(ctrl.transition);

            ctrl.data.goToPreviousState     = goToPreviousState;

            ctrl.actions.getClientProfile   = getClientProfile;
            ctrl.actions.refreshHistory     = refreshHistory;

            ctrl.actions.addClient          = addClient;
            ctrl.actions.editClient         = editClient;

            ctrl.actions.addHistoryItem     = addHistoryItem;
            ctrl.actions.editHistoryItem    = editHistoryItem;

            $q.all([
                getAllServices(), 
                getAllServiceTypes(),
                getAllStaff()
            ]).then(function(data) {
                ctrl.data.allServices = data[0];
                ctrl.data.allServiceTypes = data[1];
                ctrl.data.allStaff = data[2];
            });

            if (ctrl.data.clientId !== '0') {
                $q.all([
                    getClientProfile(ctrl.data.clientId), 
                    getClientHistory(ctrl.data.clientId)
                ]).then(function(data) {});
            } else {
                addClient();
            }   
            
            // joinRoom(ctrl.data.clientId);

        }

        ctrl.$onDestroy = function() {
            // leaveRoom();
        }

        // function joinRoom(clientId) {
        //     socketService.emit('c:enter-client-page', { roomId: clientId });
        // }
        // function leaveRoom() {
        //     socketService.emit('c:leave-client-page', { roomId: ctrl.data.clientId });
        // }
        
        // socketService.on('s:enter-client-page', function(data){
        //     console.log('User joined: ', data);
        // });

        // socketService.on('s:leave-client-page', function(data){
        //     console.log('User left: ', data);
        // });
        
        function getAllServices()       { return ServicesDataService.getAll(); }
        function getAllServiceTypes()   { return ServiceTypesDataService.getAll(); }
        function getAllStaff()          { return StaffDataService.getAll(); }

        function getClientProfile(clientId) { 
            ClientsDataService.getOne(clientId).then(function(rClient) {
                ctrl.data.client = rClient;  
                if(!ctrl.data.client) {
                    goToPreviousState();
                    toastr.info('Clientul a fost sters', 'Client negasit');
                } else if(ctrl.data.client._preferredStaffId) {
                    getSelectedStaff(ctrl.data.client._preferredStaffId);
                } 
            }); 
        }

        function getClientHistory(clientId) { 
            HistoryDataService.getAllById(clientId).then(function(rHistory) {
                ctrl.data.history = rHistory;
                // console.log(ctrl.data.history);
                getPaymentHabit(ctrl.data.history);
            }); 
        }

        function getPaymentHabit(history) {
            getLastThreeSessions(history);
            getPaymentPercentageByType(history);
        }

        function getLastThreeSessions(history) {
            var lastThreeSessions = history.slice(-3);

            ctrl.data.lastThreeSessions = lastThreeSessions.map(historyPaymentExtract);
            console.log('ctrl.data.lastThreeSessions', ctrl.data.lastThreeSessions);
        }

        function getPaymentPercentageByType(history) {
            ctrl.data.allSessions = history.map(historyPaymentExtract);
            console.log('ctrl.data.allSessions', ctrl.data.allSessions);

            var test = [];

            angular.forEach(ctrl.data.allSessions, function(session, key) {
                angular.forEach(session, function(paymentType, id) {
                    if(paymentType.id) {
                        test[paymentType.id] = test[paymentType.id] ? test[paymentType.id] + 1 : 1;
                    }
                });

            });
            console.log(test);
        }

        function historyPaymentExtract(item) {
            if(item.payment && item.payment.paidAmounts.length) {
                var sessionPayment = item.payment.paidAmounts.map(function(itemPaidAmount) {
                    return itemPaidAmount.type;
                });
                return sessionPayment;
            }
        }

        function getSelectedStaff(selectedStaffId) {
            StaffDataService.getOne(selectedStaffId).then(function(rPreferredStaff) {
                ctrl.data.preferredStaff = rPreferredStaff;
            });
        }
        function setPreviousState(transition) {
            return {
                name: transition.from().name || 'home',
                paramName: Object.keys(transition.params('from'))[1] || null,
                paramValue: transition.params('from')[Object.keys(transition.params('from'))[1]] || null
            };
        }

        function goToPreviousState() {
            $state.go(ctrl.data.previousState.name, {[ctrl.data.previousState.paramName]: ctrl.data.previousState.paramValue});
        }

        function refreshHistory(event) {
            getClientHistory(event.clientId);
            toastr.success('Sedinte gasite: ' + ctrl.data.history.length, 'Succes');
        }

        function addClient() {
            var dialogData = {
                client: null,
                title: 'Adaugati client',
                clientVip: ctrl.data.clientVip,
                staff: ctrl.data.allStaff
            };
            showClientProfileDialog(null, dialogData, addNewClient);
        }

        function editClient(event) {
            var dialogData = {
                client: event.client ? angular.copy(event.client) : null,
                title: 'Editati client',
                clientVip: ctrl.data.clientVip,
                staff: ctrl.data.allStaff
            };
            showClientProfileDialog(event.event, dialogData, updateClient, deleteClient);
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

        function deleteClient(client) {
            ClientsDataService.deleteOne(client._id).then(function(rSuccess) {
                toastr.success("Client sters", "Succes");
            });
        }

        function showClientProfileDialog(event, dialogData, saveCb, deleteCb) {
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
                saveCb(client);
            }, function(data) {
                if(!data.item || !data.item._id) {
                    goToPreviousState();
                }
                if(data && data.command === 'delete' && data.item._id) {
                    deleteCb(data.item);
                    $state.go('home');
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
                serviceTypes: ctrl.data.allServiceTypes,
                lastHistoryItem: ctrl.data.history[ctrl.data.history.length - 1]
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
            showHistoryDialog(event.event, dialogData, saveEditedHistoryItem, deleteHistoryItem);
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

        function deleteHistoryItem(historyItem) {
            HistoryDataService.deleteOne(historyItem._id).then(function(rSuccess) {
                toastr.success("Sedinta stearsa", "Succes");
                getClientHistory(historyItem._clientId);
            });
        }

        function showHistoryDialog(event, dialogData, saveCb, deleteCb) {
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
                saveCb(historyItem);
            }, function(data) {
                if(data && data.command === 'delete' && data.item._id) {
                    deleteCb(data.item);
                }
            });
        }
    }

})();