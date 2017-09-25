(function() {
    'use strict';

    angular
        .module('cm.components.bankAccount', [])
        .component('bankAccount', {
            templateUrl: '/components/bank-account/bank-account.html',
            controller: BankAccountController,
            bindings: {}
        });

    function BankAccountController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            
        };
    }

    BankAccountController.$inject = [];
})();