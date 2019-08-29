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
            ctrl.actions.editAppointment = editAppointment;
            ctrl.actions.showAppointmentItemDetails = showAppointmentItemDetails;
            ctrl.actions.goToDate = goToDate;

            init();
        };

        function init() {
            
            $q.all([getAllStaff(), getAllServiceTypes(), getAppointmentsForDate(ctrl.data.selectedDate)]).then(function(data) {
                ctrl.data.allStaff = data[0];
                ctrl.data.allServiceTypes = data[1];
                ctrl.data.appointments = getAppointmentData(data[2]);
                ctrl.data.showAppointmentItemDetails = generateAppointmentDetailsList(ctrl.data.appointments);
            });
        }

        function getAllStaff()                  { return StaffDataService.getAll(); }
        function getAllServiceTypes()           { return ServiceTypesDataService.getAll(); }
        function getAppointmentsForDate(date)   { return AppointmentsDataService.getAllByDate(date)}

        function setRouteDate(dateParams) {
            return dateParams.date
                ? new Date(moment(dateParams.date, "DD-MM-Y"))
                : $state.go('calendar', { date: moment(ctrl.data.today).format('DD-MM-Y') });
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

        function generateAppointmentDetailsList(appointments) {
            var list = {};

            angular.forEach(appointments, function(item, key) {
                list[item._id] = false;
            });

            return list;
        }

        function showAppointmentItemDetails(id, boolean) {
            ctrl.data.showAppointmentItemDetails[id] = 
                typeof(boolean) === 'boolean' 
                    ? boolean 
                    : !ctrl.data.showAppointmentItemDetails[id];
        }

        function getAppointmentData(appointments) {
            angular.forEach(appointments, function(appointment) {
                ClientsDataService.getOne(appointment._clientId).then(function(rClient) {
                    appointment.client = rClient;
                });
                // angular.forEach(appointment.services, function(service) {
                //     if(service.staff) {
                //         StaffDataService.getOne(service.staff).then(function(rStaff) {
                //             service.staff = rStaff;
                //         });
                //     }
                //     if(service.type) {
                //         ServiceTypesDataService.getOne(service.type).then(function(rServiceType) {
                //             service.type = rServiceType;
                //         });
                //     }
                // })
            });

            return appointments;
        }

        function showAppointmentDialog(event, dialogData, saveCb, deleteCb) {
            $mdDialog.show({
                controller: 'AppointmentDialogController',
                controllerAs: '$ctrl',
                templateUrl: 'components/calendar/appointment-dialog/appointment-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(appointment) {
                saveCb(appointment);
                init();
            }, function(data) {
                if(data && data.command === 'delete' && data.item._id) {
                    deleteCb(data.item);
                    init();
                }
            });
        }

        //ADD APPOINTMENT
        function addNewAppointment(event) {
            var dialogData = {
                appointment: {
                    _clientId: ctrl.data.clientId,
                    date: ctrl.data.selectedDate
                },
                title: 'Adauga Programare',
                staff: ctrl.data.allStaff,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showAppointmentDialog(event, dialogData, saveNewAppointment);
        }

        function saveNewAppointment(appointment) {
            console.log('new appointment', appointment);
            AppointmentsDataService.addNew(appointment).then(function(rSuccess) {
                toastr.success("Programare adaugata", "Succes");
            });
        }

        //EDIT APPOINTMENT
        function editAppointment(event, appointment) {
            var dialogData = {
                appointment: appointment ? angular.copy(appointment) : null,
                title: 'Editeaza Programare',
                staff: ctrl.data.allStaff,
                serviceTypes: ctrl.data.allServiceTypes
            };
            showAppointmentDialog(event, dialogData, saveEditedAppointment, deleteAppointment);
        }

        function saveEditedAppointment(appointment) {
            console.log('edit appointment', appointment);
            AppointmentsDataService.updateOne(appointment).then(function(rSuccess) {
                toastr.success("Programare editata", "Succes");
            });
            init();
        }

        function deleteAppointment(appointmentItem) {
            AppointmentsDataService.deleteOne(appointmentItem._id).then(function(rSuccess) {
                toastr.success("Programare stearsa", "Succes");
            });
            init();
        }
    }
})();