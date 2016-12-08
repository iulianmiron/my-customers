(function(){
	'use strict';

	angular.module('cm.components', 
		[
			'cm.components.home',
			'cm.components.home.searchClients',
			'cm.components.client',
			'cm.components.clientProfile',
			'cm.components.clientHistoryDetail',
			'cm.components.clientHistory'
		]
	);
})();