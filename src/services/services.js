(function() {
	'use strict';

	angular
		.module('cm.services', [])
		.service('ClientHistoryService', ClientHistory);

		function ClientHistory($http, $log) {
			this.getHistory = function(){
				return $http.get('mock-data/clientHistoryData.json').then(function(rClientHistory) {
					return rClientHistory.data;
				}).catch(function(error) {
					$log.error("could not get clientHistory", error);
				});
			}
		}

		ClientHistory.$inject = ['$http', '$log'];
})();