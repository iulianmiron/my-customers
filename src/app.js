(function() {
    'use strict';

    angular
        .module('cm', [
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            'ui.router',
            'angularMoment',
            'toastr',

            'cm.constants',
            'cm.services',
            'cm.components'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('appController', appCtrl);

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, toastrConfig) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/home');

        angular.extend(toastrConfig, {
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 5,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            progressBar: true,
            tapToDismiss: true,
            extendedTimeOut: 5000,
            target: 'body'
        });

        $stateProvider
            .state('home', {
                url: '/home',
                component: 'home'
            })
            .state('client', {
                url: '/client/:id',
                component: 'client'
            })
            .state('admin', {
                url: '/admin',
                component: 'admin'
            })
            .state('shop', {
                url: '/shop',
                component: 'shop'
            });
    }

    function appRun(amMoment) {
        amMoment.changeLocale('ro');
    }

    function appCtrl($http, $log, toastr) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.status.isSidenavOpen = false;
        ctrl.actions.controlSidenav = controlSidenav;

        function controlSidenav(event) {
            ctrl.status.isSidenavOpen = angular.copy(event.sidenavControl);
        }
    }

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', 'toastrConfig'];
    appRun.$inject = ['amMoment'];
    appCtrl.$inject = ['$http', '$log', 'toastr'];
})();