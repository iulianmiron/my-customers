(function() {
    'use strict';

    angular
        .module('cm.directives.activateSpinner', [])
        .directive('activateSpinner', activateSpinnerController);

    activateSpinnerController.$inject = ['$http', '$timeout', 'spinnerService'];
    function activateSpinnerController($http, $timeout, spinnerService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 1;
                };
                scope.$watch(scope.isLoading, function (value) {
                    if (value) {
                        spinnerService.show(attrs.name)
                    } else {
                        $timeout(function() {
                            spinnerService.hide(attrs.name);
                        }, 400);
                    }
                });
            }
        };
    }
})();