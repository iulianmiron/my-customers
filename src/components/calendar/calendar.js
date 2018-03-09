(function() {
    'use strict';

    angular
        .module('cm.components.calendar', [])
        .component('calendar', {
            templateUrl: '/components/calendar/calendar.html',
            controller: CalendarController,
            bindings: {}
        });

    CalendarController.$inject = ['$rootElement', '$mdDialog'];
    function CalendarController($rootElement, $mdDialog) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.actions.addNewAppointment = addNewAppointment;
        };

        function addNewAppointment(event) {
            var dialogData = {
                appointment: {
                    _clientId: ctrl.data.clientId
                },
                title: 'Adauga Programare',
                services: ctrl.data.allServices,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showAddAppointmentDialog(event, dialogData, saveNewAppointment);
        }

        function showAddAppointmentDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'AddAppointmentDialogController',
                controllerAs: '$ctrl',
                templateUrl: 'components/calendar/add-appointment-dialog/add-appointment-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(appointment) {
                cb(appointment);
            }, function() {

            });
        }

        //TODO
        function saveNewAppointment(appointment) {
            // HistoryDataService.addHistoryItem(historyItem).then(function(rSuccess) {
            //     toastr.success("Sedinta adaugata", "Succes");
            //     getClientHistory(historyItem._clientId);
            // });
        }

    }
})();