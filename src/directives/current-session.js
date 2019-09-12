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
                var color = attributes.sessionColor || '#9c27b0';
                if($scope.currentSession && $scope.currentSession.isSame(new Date(), "day")) {
                    // element.css('border', color + ' 2px solid');
                    // element.css('border-left', color + ' 4px solid');
                    element.css('box-shadow', '0px 0px 0px 3px ' + color);
                } else {
                    element.css('border-left', color + ' 2px solid');
                }
            }
        }
    }
})();