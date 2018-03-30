(function() {
    'use strict';

    angular
        .module('cm.components.calendar.addAppointmentDialog', [])
        .controller('AddAppointmentDialogController', AddAppointmentDialogController);
        
    AddAppointmentDialogController.$inject = ['$timeout', '$mdDialog', '$state', 'dialogData', 'StaffDataService', 'ServiceTypesDataService'];
    function AddAppointmentDialogController($timeout, $mdDialog, $state, dialogData, StaffDataService, ServiceTypesDataService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.appointment = dialogData.appointment;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.appointment.date = ctrl.data.appointment.date ? new Date(ctrl.data.appointment.date) : new Date();
        ctrl.data.appointment.startTime = new Date();
        ctrl.data.appointment.endTime = new Date();

        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };
        
        ctrl.actions.loadStaff = loadStaff;
        ctrl.actions.loadServices = loadServices;

        ctrl.actions.addService = addService;
        ctrl.actions.removeService = removeService;
        ctrl.actions.selectClient = selectClient;

        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;

        ctrl.actions.showData = function() {
            console.log('appointment', ctrl.data.appointment);
        };

        function loadStaff() {
            return StaffDataService.getAll().then(function(rSuccess) {
                ctrl.data.staff = rSuccess;
            }).catch(function(rError) {
                console.error(rError);
            });
        }

        function loadServices() {
            return ServiceTypesDataService.getAll().then(function(rSuccess) {
                ctrl.data.services = rSuccess;
            }).catch(function(rError) {
                console.error(rError);
            });
        }

        function addService() {
            var service = {
                staff: null,
                type: null
            };

            ctrl.data.appointment.services 
            ? ctrl.data.appointment.services.push(service)
            : ctrl.data.appointment.services = [];
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
            } 
            else if (event.client) {

                event.client._id === 0 
                ? $state.go('client', {id: 0})
                : ctrl.data.appointment._clientId = event.client._id;

            }
        }
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(appointment) {
            $mdDialog.hide(appointment);
        };
    }
})();