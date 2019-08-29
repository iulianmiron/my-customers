(function() {
    'use strict';

    angular
        .module('cm.components.home', [])
        .component('home', {
            templateUrl: '/components/home/home.html',
            controller: HomeController,
            bindings: {}
        });

    HomeController.$inject = ['$state'];
    function HomeController($state) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function () {
            ctrl.actions.openClientPage = openClientPage;
        }

        function openClientPage(event) {
            if(event.client && (event.client._id || event.client._id === 0)) {
                $state.go('client', { id: event.client._id });
            }
        }
    }

})();