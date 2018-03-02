(function() {
    'use strict';

    angular
        .module('cm.components.calendar.addAppointmentDialog', [])
        .controller('AddAppointmentDialogController', AddAppointmentDialogController);
        
    AddAppointmentDialogController.$inject = ['$timeout', '$element', '$mdDialog', 'dialogData'];
    function AddAppointmentDialogController($timeout, $element, $mdDialog, dialogData) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.title = dialogData.title;
        ctrl.data.appointment = dialogData.appointment;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.appointment.date = ctrl.data.appointment.date ? new Date(ctrl.data.appointment.date) : new Date();

        ctrl.data.maxDate = new Date();
        
        ctrl.actions.loadStaff = loadStaff;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        function loadStaff() {
            return StaffDataService.getAllStaff().then(function(rSuccess) {
                ctrl.data.staff = rSuccess;
            }).catch(function(rError) {
                console.error(rError);
            });
        }
       
        function cancel() {
            $mdDialog.cancel();
        };

        function save(appointment) {
            $mdDialog.hide(appointment);
        };

        function changeSelectedServicesText(selectedServices) {
            return (selectedServices && selectedServices.length) 
                ? selectedServices.length > 1 
                    ? selectedServices.length + ' servicii selectate.'
                    : selectedServices.length + ' serviciu selectat'
                : 'Nu sunt servicii selectate';            
        }
    }
})();