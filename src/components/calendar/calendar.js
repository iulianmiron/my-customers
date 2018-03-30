(function() {
    'use strict';

    angular
        .module('cm.components.calendar', [])
        .component('calendar', {
            templateUrl: '/components/calendar/calendar.html',
            controller: CalendarController,
            bindings: {
                transition: '<$transition$'
            }
        });

    CalendarController.$inject = ['$rootElement', '$mdDialog', '$state'];
    function CalendarController($rootElement, $mdDialog, $state) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
             
            ctrl.data.today = new Date();
            ctrl.data.selectedDate = setSelectedDate(ctrl.transition.params('to'));

            ctrl.actions.addNewAppointment = addNewAppointment;
            ctrl.actions.selectDate = selectDate;
        };

        function setSelectedDate(dateParams) {
            return dateParams.date
                ? moment(dateParams.date, "D-M-Y")
                : new Date();
        }

        function selectDate(date, modifier) {

            date = new Date(date);
            date.setDate(date.getDate() + modifier || 0);

            $state.go('calendar', { date: moment(date).format('D-M-Y') });
            
        }

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
            console.log(appointment);
            // HistoryDataService.addOne(historyItem).then(function(rSuccess) {
            //     toastr.success("Sedinta adaugata", "Succes");
            //     getClientHistory(historyItem._clientId);
            // });
        }

    }
})();