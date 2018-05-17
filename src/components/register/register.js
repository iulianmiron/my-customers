(function() {
    'use strict';

    angular
        .module('cm.components.register', [])
        .component('register', {
            templateUrl: '/components/register/register.html',
            controller: RegisterController,
            bindings: {}
        });

    RegisterController.$inject = ['UsersDataService'];
    function RegisterController(UsersDataService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.actions.register = register;
        };

        function register(user) {
            var names = splitNames(user.firstAndLastNames);
            debugger;
        }

        function splitNames(names) {
            var lastSpaceIndex = names.trim().lastIndexOf(' ');
            var firstName = names.substring(0, lastSpaceIndex);
            var lastName = names.substring(lastSpaceIndex + 1);
            return { firstName: firstName, lastName: lastName };
        }
    }

})();