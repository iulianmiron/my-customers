(function() {
    'use strict';

    angular
        .module('cm.components.settings.services', [])
        .component('services', {
            templateUrl: '/components/settings/services/services.html',
            controller: ServicesController,
            bindings: {}
        });

    function ServicesController(ServicesDataService, SERVICE_TYPES, toastr) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.status.showEditServiceControls = false;
            ctrl.data.newService = {};
            ctrl.data.serviceTypes = SERVICE_TYPES;

            ctrl.actions.cancelSaveNewService = resetForm;
            ctrl.actions.saveNewService = saveNewService;
            ctrl.actions.selectService = selectService;
            ctrl.actions.editService = editService;
            ctrl.actions.deleteService = deleteService;

            getAllServices();
        }

        function resetForm() {
            ctrl.data.newService = {};
            ctrl.status.showEditServiceControls = false;
            ctrl.data.addServiceForm.$setPristine();
            ctrl.data.addServiceForm.$setUntouched();
        }

        function selectService(service) {
            ctrl.data.newService = angular.copy(service);
            ctrl.status.showEditServiceControls = true;
        }

        function editService(service) {
            ServicesDataService.updateService(service).then(function(rSuccess) {
                toastr.success("Serviciul editat cu succes");
                return rSuccess.data;
            });
            getAllServices();
            resetForm();
        }

        function saveNewService(newService) {
            ServicesDataService.addService(newService).then(function(rSuccess) {
                toastr.success("Serviciul adaugat cu succes");
                return rSuccess.data;
            });
            getAllServices();
            resetForm();
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
    }

    ServicesController.$inject = ['ServicesDataService', 'SERVICE_TYPES', 'toastr'];
})();