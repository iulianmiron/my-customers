(function(){
    'use strict';

    angular
        .module('cm.directives.currentSession', [])
        .directive('currentSession', currentSessionController);

    function currentSessionController() {
        return {
            restrict: 'A',
            scope: { currentSession: '<' },
            link: function($scope, element, attributes) {
                if($scope.currentSession && isToday($scope.currentSession)) {

                    var color = attributes.sessionColor || '#9c27b0';
                    element.css('border', color + ' 2px solid');
                }

                function isToday(date) {
                    return moment().diff(date, 'days') === 0;
                }
            }
        }
    }
})();