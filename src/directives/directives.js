(function() {
    'use strict';

    angular
        .module('cm.directives', [
            'cm.directives.vipColor'
        ]);
})();

(function(){
    'use strict';

    angular
        .module('cm.directives.vipColor', [])
        .directive('vipColor', vipColorController);

    function vipColorController() {
        return {
            restrict: 'A',
            link: function($scope, element, attributes) {
                var whatToColor = null;

                attributes.$observe('vipStyle', function(value){
                    if(value){
                        whatToColor = value === 'background' ? 'background-color': 'color'; 
                    }
                });
                

                attributes.$observe('vipColor', function(value){
                    if(value){
                        switch(attributes.vipColor) {
                            case 'Low':
                                element.css(whatToColor, '#ff7500');
                                break;
                            case 'Medium':
                                element.css(whatToColor, '#ff7500');
                                break;
                            case 'High':
                                element.css(whatToColor, '#ff7500');
                                break;
                            case 'Very High':
                                element.css(whatToColor, '#ff7500');
                                break;
                        }
                    }
                });
            }
        }
    }
})();