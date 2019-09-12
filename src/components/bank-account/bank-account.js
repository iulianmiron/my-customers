(function() {
    'use strict';

    angular
        .module('cm.components.bankAccount', [])
        .component('bankAccount', {
            templateUrl: '/components/bank-account/bank-account.html',
            controller: BankAccountController,
            bindings: {}
        });

    BankAccountController.$inject = ['UtilsService'];
    function BankAccountController(UtilsService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.actions.copyToClipboard = copyToClipboard;
        };

        function copyToClipboard(data, title) {
            UtilsService.copyToClipboard(data, title);
        }
    }
})();