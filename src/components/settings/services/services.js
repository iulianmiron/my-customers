(function() {
    'use strict';

    angular
        .module('cm.components.settings.services', [])
        .component('services', {
            templateUrl: '/components/settings/services/services.html',
            controller: ServicesController,
            bindings: {}
        });

    function ServicesController($mdDialog, $rootElement, ServicesDataService, SERVICE_TYPES, toastr) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.serviceTypes = SERVICE_TYPES;

            ctrl.actions.editService = editService;
            ctrl.actions.deleteService = deleteService;
            ctrl.actions.addService = addService;

            getAllServices();
        }

        function saveEditedService(service) {
            ServicesDataService.updateService(service).then(function(rSuccess) {
                toastr.success("Serviciul editat cu succes");
                return rSuccess.data;
            });
            getAllServices();
        }

        function addNewService(newService) {
            ServicesDataService.addService(newService).then(function(rSuccess) {
                toastr.success("Serviciul adaugat cu succes");
                return rSuccess.data;
            });
            getAllServices(); 
        }

        function deleteService(serviceId) {
            ServicesDataService.deleteService(serviceId).then(function(rSuccess) {
                toastr.success("Serviciul sters cu succes");
                return rSuccess.data;
            });
            getAllServices();
        }

        function getAllServices() {
            ServicesDataService.getAllServices().then(function(rServices) {
                ctrl.data.allServices = rServices;
            });
        }

        function addService(event) {
            var service = service;
            var dialogData = {
                service: service ? angular.copy(service) : null,
                serviceTypes: ctrl.data.serviceTypes,
                title: 'Adaugati serviciu nou'
            };
            showDialog(event, dialogData, addNewService);
        }

        function editService(event, service) {
            var service = service;
            var dialogData = {
                service: service ? angular.copy(service) : null,
                serviceTypes: ctrl.data.serviceTypes,
                title: 'Editati serviciul: ' + service.name
            };
            showDialog(event, dialogData, saveEditedService);
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ServiceDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/settings/services/service-dialog/service-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(service) {
                cb(service);
            }, function() {
                //service edit cancelled
            });
        }
    }

    ServicesController.$inject = ['$mdDialog', '$rootElement', 'ServicesDataService', 'SERVICE_TYPES', 'toastr'];
})();