(function(){
    'use strict';

    angular
        .module('cm.directives.adminOnly', [])
        .directive('adminOnly', adminOnlyController);

    adminOnlyController.$inject = ['localStorageService'];
    function adminOnlyController(localStorageService) {
        return {
            restrict: 'A',
            scope: {},
            link: function($scope, element, attributes) {

                localStorageService.get('show-admin-controls') 
                    ? element.css('display', 'display')
                    : element.css('display', 'none');
            }
        }
    }
})();