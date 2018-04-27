(function() {
    'use strict';

    angular
        .module('cm.directives.buttonShrink', [])
        .directive('buttonShrink', buttonShrinkController);

    buttonShrinkController.$inject = ['$mdMedia', '$compile'];
    function buttonShrinkController($mdMedia, $compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if(attrs.buttonShrink) {
                    var btnText = element.contents()[2].textContent;
                    var tooltip = angular.element('<md-tooltip hide-' + attrs.buttonShrink + '>'+ btnText +'</md-tooltip>');
                    element.append(tooltip);
                    $compile(tooltip)(scope);

                    scope.$watch(function() { return $mdMedia(attrs.buttonShrink); }, function(shrinkButton) {
                        if(shrinkButton) {
                            element.removeClass('md-icon-button');
                            element.contents()[2].textContent = btnText;

                        } else {
                            element.addClass('md-icon-button');
                            element.contents()[2].textContent = "";
                        }
                    });  
                }            
            }
        };
    }
})();