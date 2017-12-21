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

            'cm.dataservices',

            'cm.constants',
            'cm.directives',
            'cm.services',
            'cm.components'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('appController', appCtrl);

    function appConfig($mdDateLocaleProvider, toastrConfig) {

        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };

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

    appConfig.$inject = ['$mdDateLocaleProvider', 'toastrConfig'];
    appRun.$inject = ['amMoment'];
    appCtrl.$inject = ['$http', '$log', 'toastr'];
})();