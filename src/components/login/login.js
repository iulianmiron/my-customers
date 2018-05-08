(function() {
    'use strict';

    angular
        .module('cm.components.login', [])
        .component('login', {
            templateUrl: '/components/login/login.html',
            controller: LoginController,
            bindings: {}
        });

    LoginController.$inject = ['auth'];
    function LoginController(auth) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.actions.login = login;
        };

        function login(user) {
            auth.login(user.username, user.password).then(function(loggedInUser) {
                debugger;
            }).catch(function(error) {
                console.error('Something went wrong.', error);
                //Do something
            });
        }
    }

})();