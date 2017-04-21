(function () {
    'use strict';

    angular
        .module('cm.components.admin', [])
        .component('admin', {
            templateUrl: '/components/admin/admin.html',
            controller: AdminController,
            bindings: {}
        });

    function AdminController(AdminServices, SERVICE_TYPES, toastr) {
        var ctrl = this;
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

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
            AdminServices.updateService(service).then(function(rSuccess) {
                toastr.success("Serviciul editat cu succes");
                return rSuccess.data;
            });
            resetForm();
            getAllServices();
        }

        function saveNewService(newService) {
            AdminServices.addService(newService).then(function(rSuccess) {
                toastr.success("Serviciul adaugat cu succes");
                return rSuccess.data;
            });
            getAllServices();
            resetForm();
        }

        function deleteService(serviceId) {
            AdminServices.deleteService(serviceId).then(function(rSuccess) {
                toastr.success("Serviciul sters cu succes");
                return rSuccess.data;
            });
            getAllServices();
        }

        function getAllServices() {
            AdminServices.getAllServices().then(function(rServices) {
                ctrl.data.allServices = rServices;
            });
        }
    }

    AdminController.$inject = ['AdminServices', 'SERVICE_TYPES', 'toastr'];
})();