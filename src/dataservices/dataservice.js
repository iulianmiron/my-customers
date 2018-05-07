(function() {
    'use strict';

    angular
        .module('cm.dataservice', ['cm.dataservices'])
        .service('DataService', DataService);

        DataService.$inject = ['$http'];
        function DataService($http) {
            var service = this;

            service.serverCall = serverCall;

            function serverCall(url, method, data) {
                return $http({
                    url: url,
                    method: method,
                    data: data || {}
                })
                .then(_handleSuccess)
                .catch(_handleError);
    
                function _handleSuccess(response){
                    return response.data;
                }
        
                function _handleError(response) {
                    console.error('Could not ' + method + ' in: ' + url);
                    console.error('Error: ', response);
                }
            }
        }
})();