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
        'toastr', 'UtilsService'
    ];
    function CalendarController(
        $q, $rootElement, $mdDialog, $state, 
        StaffDataService, ServiceTypesDataService, AppointmentsDataService, ClientsDataService,
        toastr, UtilsService
    ) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {

            ctrl.data.today = new Date();
            ctrl.data.selectedDate = setRouteDate(ctrl.transition.params('to'));

            ctrl.actions.addNewAppointment = addNewAppointment;
            ctrl.actions.goToDate = goToDate;

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
                ? new Date(moment(dateParams.date, "DD-MM-Y"))
                : new Date();
        }

        function goToDate(selectedDate, modifier) {
            selectedDate = new Date(selectedDate);
            selectedDate.setDate(selectedDate.getDate() + modifier);

            if(UtilsService.isToday(selectedDate) && UtilsService.isRouteDateToday(ctrl.transition.params('to').date)) {
                $state.reload();
            } else {
                $state.go('calendar', { date: moment(selectedDate).format('DD-MM-Y') });
            }
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