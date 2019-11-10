(function(){
    'use strict';

    angular
        .module('cm.filters', [])
        .filter('telThreeDigits', telThreeDigits);

        telThreeDigits.$inject = ['localStorageService'];
        function telThreeDigits(localStorageService) {
            return function(phoneNumber) {
                var adminTrigger = localStorageService.get('adminTrigger');
                var adminMode = localStorageService.get('show-admin-controls');

                if(phoneNumber && adminTrigger && adminMode) {
                    return phoneNumber;
                } else if(phoneNumber) {
                    return "07------" + phoneNumber.substr(-3);
                }
            }
        }

})();