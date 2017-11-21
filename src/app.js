(function() {
    'use strict';

    angular
        .module('cm', [
            'ngMaterial',
            'ngMessages',
            'ngAnimate',
            'ui.router',
            'angularMoment',
            'angularSpinners',
            'toastr',

            'cm.constants',
            'cm.directives',
            'cm.services',
            'cm.components'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('appController', appCtrl);

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider, toastrConfig) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };

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
            .state('settings', {
                url: '/settings',
                component: 'settings'
            })
            .state('shop', {
                url: '/shop',
                component: 'shop'
            })
            .state('bankAccount', {
                url: '/bank-account',
                component: 'bankAccount'
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

        ctrl.status.showSidenav = false;

    }

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$mdDateLocaleProvider', 'toastrConfig'];
    appRun.$inject = ['amMoment'];
    appCtrl.$inject = ['$http', '$log', 'toastr'];
})();