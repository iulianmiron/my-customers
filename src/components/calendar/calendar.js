(function() {
    'use strict';

    angular
        .module('cm.components.calendar', [])
        .component('calendar', {
            templateUrl: '/components/calendar/calendar.html',
            controller: CalendarController,
            bindings: {}
        });

    CalendarController.$inject = ['StaffDataService', 'ServicesDataService'];
    function CalendarController(StaffDataService, ServicesDataService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {

            ctrl.actions.addClient = addClient;
            ctrl.actions.loadUsers = loadUsers;
            ctrl.actions.loadServices = loadServices;
        };

        function addClient(event) {
            console.log(event.client);
        }

        function loadUsers() {
            return StaffDataService.getAllStaff().then(function(rSuccess) {
                ctrl.data.staff = rSuccess;
            }).catch(function(rError) {
                console.error(rError);
            });
        }

        function loadServices() {
            return ServicesDataService.getAllServices().then(function(rSuccess) {
                ctrl.data.services = rSuccess;
            }).catch(function(rError) {
                console.error(rError);
            });
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
            }).then(function(client) {
                cb(client);
            }, function() {

            });
        }

    }
})();