(function() {
    'use strict';

    angular
        .module('cm.components.calendar.appointmentDialog', [])
        .controller('AppointmentDialogController', AppointmentDialogController);
        
    AppointmentDialogController.$inject = ['$mdDialog', '$state', 'dialogData', 'UtilsService'];
    function AppointmentDialogController($mdDialog, $state, dialogData, UtilsService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.appointment = dialogData.appointment;
        ctrl.data.selectedClient = dialogData.appointment.client;
        ctrl.data.appointment.services = dialogData.appointment.services || [];
        ctrl.data.allStaff = dialogData.staff;
        ctrl.data.allServiceTypes = dialogData.serviceTypes;
        ctrl.data.appointment.date = ctrl.data.appointment.date ? new Date(ctrl.data.appointment.date) : new Date();
        ctrl.data.appointment.startTime = ctrl.data.appointment.startTime ? new Date(ctrl.data.appointment.startTime) : new Date();
        ctrl.data.appointment.endTime = ctrl.data.appointment.endTime ? new Date(ctrl.data.appointment.endTime) : new Date();

        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };

        ctrl.actions.addService = addService;
        ctrl.actions.removeService = removeService;
        ctrl.actions.selectClient = selectClient;

        ctrl.actions.deleteAppointment = deleteAppointment;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        ctrl.actions.showData = function() {
            console.log(ctrl.data.appointment);
        }

        if(ctrl.data.appointment.services.length === 0) {
            addService();
        }

        function addService() {
            var service = {
                staff: null,
                type: null,
                _orderId: ctrl.data.appointment.services.length || 0
            };

            ctrl.data.appointment.services.push(service);
        }

        function removeService(value) {
            angular.forEach(ctrl.data.appointment.services, function(service, index) {
                if(service === value) {
                    ctrl.data.appointment.services.splice(index, 1);
                }
            });
        }

        function selectClient(event) {
            if(event.client === undefined) { 
                ctrl.data.appointment._clientId = null; 
            } else if (event.client) {

                event.client._id === 0 
                ? $state.go('client', {id: 0})
                : ctrl.data.appointment._clientId = event.client._id;

                ctrl.data.selectedClient = event.client;
                ctrl.data.preferredStaff = UtilsService.getSelectedItems(ctrl.data.allStaff, ctrl.data.selectedClient._preferredStaffId);
            }
        }

        function deleteAppointment(appointment) {
            $mdDialog.cancel({item: appointment, command: 'delete'});
        }

        function cancel() {
            $mdDialog.cancel();
        };

        function save(appointment) {
            $mdDialog.hide(appointment);
        };
    }
})();