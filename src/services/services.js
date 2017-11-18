(function() {
	'use strict';

	angular
		.module('cm.services', [
			'cm.services.searchClients',
			'cm.services.client',
			'cm.services.settings.services',
			'cm.services.settings.products',
			'cm.services.settings.consumables'			
			]);
})();