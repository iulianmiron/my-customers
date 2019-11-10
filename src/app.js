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
            'btford.socket-io',

            'cm.dataservice',

            'cm.filters',
            'cm.constants',
            'cm.directives',
            'cm.services',
            'cm.components'
        ])
        .config(appConfig)
        .run(appRun)
        .controller('appController', appCtrl)
        .factory('socketService', socketService);

        socketService.$inject = ['socketFactory'];
        function socketService(socketFactory) {
            return socketFactory();
        }

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
    
    appCtrl.$inject = ['$state', 'toastr', 'HotkeyService', 'localStorageService'];
    function appCtrl($state, toastr, HotkeyService, localStorageService) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        localStorageService.set('show-admin-controls', false);

        ctrl.status.showSidenav = false;

        HotkeyService.addClient(addNewClient);
        HotkeyService.toggleAdmin(toggleAdmin);

        function addNewClient() {
            $state.go('client', { id: 0 });
        }
        function toggleAdmin() {
            var adminMode = !localStorageService.get('show-admin-controls');
            localStorageService.set('show-admin-controls', adminMode);

            adminMode 
                ? toastr.warning('Enabled', 'Admin Mode')
                : toastr.success('Disabled', 'Admin Mode');
            
        }
    }    
})();

