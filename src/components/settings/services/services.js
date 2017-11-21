(function() {
    'use strict';

    angular
        .module('cm.components.settings.services', [])
        .component('services', {
            templateUrl: '/components/settings/services/services.html',
            controller: ServicesController,
            bindings: {}
        });

    ServicesController.$inject = ['$q', '$mdDialog', '$rootElement', 'ServicesDataService', 'ServiceTypesDataService', 'spinnerService', 'toastr'];
    function ServicesController($q, $mdDialog, $rootElement, ServicesDataService, ServiceTypesDataService, spinnerService, toastr) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {    
            // spinnerService.show('app-loading');
            
            ctrl.actions.addService = addService;
            ctrl.actions.editService = editService;
            ctrl.actions.deleteService = deleteService;

            ctrl.actions.addServiceType = addServiceType;
            ctrl.actions.editServiceType = editServiceType;           
            ctrl.actions.deleteServiceType = deleteServiceType;  

            updateServicesData();
        }

        function updateServicesData() {
            $q.all([getAllServiceTypes(), getAllServices()]).then(function(data) {
                ctrl.data.allServiceTypes = data[0];
                ctrl.data.allServices = data[1];
            }).finally(function() {
                // spinnerService.hide('app-loading');
            });
        }

        function getAllServices() {
            return ServicesDataService.getAllServices();
        }

        function addNewService(newService) {
            ServicesDataService.addService(newService).then(function(rSuccess) {
                toastr.success("Serviciul adaugat cu succes");
                return rSuccess.data;
            });
            updateServicesData(); 
        }

        function saveEditedService(service) {
            ServicesDataService.updateService(service).then(function(rSuccess) {
                toastr.success("Serviciul editat cu succes");
                return rSuccess.data;
            });
            updateServicesData();
        }

        function deleteService(serviceId) {
            ServicesDataService.deleteService(serviceId).then(function(rSuccess) {
                toastr.success("Serviciul sters cu succes");
                return rSuccess.data;
            });
            updateServicesData();
        }

        function addService(event) {
            var service = service;
            var dialogData = {
                service: service ? angular.copy(service) : null,
                serviceTypes: ctrl.data.allServiceTypes,
                title: 'Adaugati serviciu nou'
            };
            showServiceDialog(event, dialogData, addNewService);
        }

        function editService(event, service) {
            var service = service;
            var dialogData = {
                service: service ? angular.copy(service) : null,
                serviceTypes: ctrl.data.allServiceTypes,
                title: 'Editati serviciul: ' + service.name
            };
            showServiceDialog(event, dialogData, saveEditedService);
        }

        function showServiceDialog(event, dialogData, cb) {
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
                //service action cancelled
            });
        }


/////////////////// service types ///////////////////
        function getAllServiceTypes() {
            return ServiceTypesDataService.getAllServiceTypes();
        }

        function addNewServiceType(serviceType) {
            ServiceTypesDataService.addServiceType(serviceType).then(function(rSuccess) {
                toastr.success("Tip de serviciu nou adaugat cu succes");
                return rSuccess.data;
            });
            updateServicesData();
        }

        function saveEditedServiceType(serviceType) {
            ServiceTypesDataService.updateServiceType(serviceType).then(function(rSuccess) {
                toastr.success("Tipul de serviciu editat cu succes");
                return rSuccess.data;
            });
            updateServicesData();
        }

        function deleteServiceType(serviceTypeId) {
            ServiceTypesDataService.deleteServiceType(serviceTypeId).then(function(rSuccess) {
                toastr.success("Tipul de serviciu a fost sters cu succes");
                return rSuccess.data;
            });
            updateServicesData();
        }

        function addServiceType(event) {
            var serviceType = serviceType;
            var dialogData = {
                serviceType: serviceType ? angular.copy(serviceType) : null,
                title: 'Adauga tip de serviciu nou'
            };
            showServiceTypeDialog(event, dialogData, addNewServiceType)
        }

        function editServiceType(event, serviceType) {
            var serviceType = serviceType;
            var dialogData = {
                serviceType: serviceType ? angular.copy(serviceType) : null,
                title: 'Editati tipul de serviciu: ' + serviceType.name
            };
            showServiceTypeDialog(event, dialogData, saveEditedServiceType);
        }

        function showServiceTypeDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ServiceTypeDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/settings/services/service-type-dialog/service-type-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(serviceType) {
                cb(serviceType);
            }, function() {
                //service type action cancelled
            });
        }
    }
})();