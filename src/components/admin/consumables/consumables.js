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

            ctrl.actions.getAllConsumables = getAllConsumables;
            ctrl.actions.addConsumable = addConsumable;
            ctrl.actions.editConsumable = editConsumable;
            ctrl.actions.deleteConsumable = deleteConsumable;
            ctrl.actions.saveEditedConsumable = saveEditedConsumable;
           
            getAllConsumables();
        }

        function getAllConsumables() {
            ConsumablesServices.getAllConsumables().then(function(rConsumables) {
                ctrl.data.allConsumables = rConsumables;
            });
        }

        function saveNewConsumable(newConsumable) {
            ConsumablesServices.addConsumable(newConsumable).then(function(rSuccess) {
                toastr.success("Consumabilul adaugat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }
        
        function saveEditedConsumable(consumable) {
            ConsumablesServices.updateConsumable(consumable).then(function(rSuccess) {
                toastr.success("Consumabilul editat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function deleteConsumable(consumableId) {
            ConsumablesServices.deleteConsumable(consumableId).then(function(rSuccess) {
                toastr.success("Consumabilul sters cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function editConsumable(event, consumable) {
            var consumable = consumable;
            var dialogData = {
                consumable: consumable ? angular.copy(consumable) : null,
                title: 'Editati consumabil'
            };

            showDialog(event, dialogData, saveEditedConsumable);
        }

        function addConsumable(event) {
            var consumable = consumable;
            var dialogData = {
                consumable: consumable ? angular.copy(consumable) : null,
                title: 'Adaugati consumabil nou'
            };
            showDialog(event, dialogData, saveNewConsumable);
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ConsumableDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/admin/consumables/consumable-dialog/consumable-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(consumable) {
                cb(consumable);
            }, function() {
                //consumable edit cancelled
            });
        }
    }

    ConsumablesController.$inject = ['$mdDialog', '$rootElement', 'ConsumablesServices', 'toastr', 'NO_PICTURE'];
})();