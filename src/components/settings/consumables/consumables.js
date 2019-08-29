(function() {
    'use strict';

    angular
        .module('cm.components.settings.consumables', [])
        .component('consumables', {
            templateUrl: '/components/settings/consumables/consumables.html',
            controller: ConsumablesController,
            bindings: {}
        });

    function ConsumablesController($mdDialog, $rootElement, ConsumablesDataService, toastr, NO_PICTURE) {
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
            ConsumablesDataService.getAll().then(function(rConsumables) {
                ctrl.data.allConsumables = rConsumables;
            });
        }

        function saveNewConsumable(newConsumable) {
            ConsumablesDataService.addNew(newConsumable).then(function(rSuccess) {
                toastr.success("Consumabilul adaugat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }
        
        function saveEditedConsumable(consumable) {
            ConsumablesDataService.updateOne(consumable).then(function(rSuccess) {
                toastr.success("Consumabilul editat cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function deleteConsumable(consumableId) {
            ConsumablesDataService.deleteOne(consumableId).then(function(rSuccess) {
                toastr.success("Consumabilul sters cu succes");
                return rSuccess.data;
            });
            getAllConsumables();
        }

        function editConsumable(event, consumable) {
            var consumable = consumable;
            var dialogData = {
                consumable: consumable ? angular.copy(consumable) : null,
                title: 'Editeaza consumabil'
            };

            showDialog(event, dialogData, saveEditedConsumable);
        }

        function addConsumable(event) {
            var consumable = consumable;
            var dialogData = {
                consumable: consumable ? angular.copy(consumable) : null,
                title: 'Adauga consumabil nou'
            };
            showDialog(event, dialogData, saveNewConsumable);
        }

        function showDialog(event, dialogData, cb) {
            $mdDialog.show({
                controller: 'ConsumableDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/settings/consumables/consumable-dialog/consumable-dialog.html',
                locals: {
                    dialogData: dialogData
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(consumable) {
                cb(consumable);
            }, function() {
                //consumable edit cancelled
            });
        }
    }

    ConsumablesController.$inject = ['$mdDialog', '$rootElement', 'ConsumablesDataService', 'toastr', 'NO_PICTURE'];
})();