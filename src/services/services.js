(function() {
	'use strict';

	angular
		.module('cm.services', [
			'cm.services.searchClients',
			'cm.services.client',
			'cm.services.admin.services',
			'cm.services.admin.products'			
			]);
})();