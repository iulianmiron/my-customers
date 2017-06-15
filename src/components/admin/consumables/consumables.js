(function() {
    'use strict';

    angular
        .module('cm.components.admin.consumables', [])
        .component('consumables', {
            templateUrl: '/components/admin/consumables/consumables.html',
            controller: ConsumablesController,
            bindings: {}
        });

    function ConsumablesController($mdDialog, $rootElement, ConsumablesServices, toastr, NO_PICTURE) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.noPicture = NO_PICTURE;

            ctrl.actions.addConsumable = addConsumable;
            ctrl.actions.getAllConsumables = getAllConsumables;
            ctrl.actions.deleteConsumable = deleteConsumable;
            ctrl.actions.selectConsumable = selectConsumable;
            ctrl.actions.editConsumable = editConsumable;

            getAllConsumables();
        }

        function addConsumable(event) {
            $mdDialog.show({
                controller: 'AddConsumableDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/admin/consumables/add-consumable/add-consumable.dialog.html',
                locals: {
                    serviceTypes: ctrl.data.serviceTypes
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(consumable) {
                saveNewConsumable(consumable);
            }, function() {
                //no consumable added
            });
        }

        function saveNewConsumable(newConsumable) {
            ConsumablesServices.addConsumable(newConsumable).then(function(rSuccess) {
                toastr.success("Consumabilul adaugat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function getAllConsumables() {
            ConsumablesServices.getAllConsumables().then(function(rConsumables) {
                ctrl.data.allConsumables = rConsumables;
            });
        }

        function deleteConsumable(consumableId) {
            ConsumablesServices.deleteConsumable(consumableId).then(function(rSuccess) {
                toastr.success("Consumabilul sters cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function selectConsumable(event, consumable) {
            $mdDialog.show({
                controller: 'EditConsumableDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/admin/consumables/edit-consumable/edit-consumable.dialog.html',
                locals: {
                    consumable: angular.copy(consumable)
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(consumable) {
                editConsumable(consumable);
            }, function() {
                //consumable edit cancelled
            });
        }

        function editConsumable(consumable) {
            ConsumablesServices.updateConsumable(consumable).then(function(rSuccess) {
                toastr.success("Consumabilul editat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }
    }

    ConsumablesController.$inject = ['$mdDialog', '$rootElement', 'ConsumablesServices', 'toastr', 'NO_PICTURE'];
})();