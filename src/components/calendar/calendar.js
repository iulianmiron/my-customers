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

    CalendarController.$inject = [
        '$q', '$rootElement', '$mdDialog', '$state', 
        'StaffDataService', 'ServiceTypesDataService', 'AppointmentsDataService', 'ClientsDataService',
        'toastr'
    ];
    function CalendarController(
        $q, $rootElement, $mdDialog, $state, 
        StaffDataService, ServiceTypesDataService, AppointmentsDataService, ClientsDataService,
        toastr
    ) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
             
            ctrl.data.today = new Date();
            ctrl.data.selectedDate = setRouteDate(ctrl.transition.params('to'));

            ctrl.actions.addNewAppointment = addNewAppointment;
            ctrl.actions.selectDate = selectDate;

            $q.all([getAllStaff(), getAllServiceTypes(), getAppointmentsForDate(ctrl.data.selectedDate)]).then(function(data) {
                ctrl.data.allStaff = data[0];
                ctrl.data.allServiceTypes = data[1];
                ctrl.data.appointments = getAppointmentData(data[2]);
            });
        };

        function getAllStaff()                  { return StaffDataService.getAll(); }
        function getAllServiceTypes()           { return ServiceTypesDataService.getAll(); }
        function getAppointmentsForDate(date)   { return AppointmentsDataService.getAllByDate(date)}

        function setRouteDate(dateParams) {
            return dateParams.date
                ? new Date(moment(dateParams.date, "D-M-Y"))
                : new Date();
        }

        function selectDate(date, modifier) {
            date = new Date(date);
            date.setDate(date.getDate() + modifier);
            $state.go('calendar', { date: moment(date).format('D-M-Y') });
        }

        function getAppointmentData(appointments) {
            angular.forEach(appointments, function(appointment) {
                ClientsDataService.getOne(appointment._clientId).then(function(rClient) {
                    appointment.client = rClient;
                });
                angular.forEach(appointment.services, function(service) {
                    if(service.staff) {
                        StaffDataService.getOne(service.staff).then(function(rStaff) {
                            service.staff = rStaff;
                        });
                    }
                    if(service.type) {
                        ServiceTypesDataService.getOne(service.type).then(function(rServiceType) {
                            service.type = rServiceType;
                        });
                    }
                })
            });

            return appointments;
        }

        function addNewAppointment(event) {
            var dialogData = {
                appointment: {
                    _clientId: ctrl.data.clientId
                },
                title: 'Adauga Programare',
                staff: ctrl.data.allStaff,
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

        function saveNewAppointment(appointment) {
            AppointmentsDataService.addNew(appointment).then(function(rSuccess) {
                toastr.success("Programare adaugata", "Succes");
            });
        }

    }
})();