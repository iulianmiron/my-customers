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
            'LocalStorageModule',
            'toastr',
            'cfp.hotkeys',
            'angular-clipboard',
            'md.time.picker',
            'ngScrollGlue',
            'ngCsv',

            'cm.dataservice',

            'cm.constants',
            'cm.directives',
            'cm.services',
            'cm.components'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('appController', appCtrl);

    appConfig.$inject = ['$mdDateLocaleProvider', 'toastrConfig'];
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

    appRun.$inject = ['amMoment'];
    function appRun(amMoment) {
        amMoment.changeLocale('ro');
    }

    
    appCtrl.$inject = ['$state', 'HotkeyService', 'localStorageService'];
    function appCtrl($state, HotkeyService, localStorageService) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        localStorageService.set('show-admin-controls', true);

        ctrl.status.showSidenav = false;

        HotkeyService.addClient(addNewClient);

        function addNewClient() {
            $state.go('client', { id: 0 });
        }

    }    
})();