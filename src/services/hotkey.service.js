(function() {
	'use strict';

	angular
		.module('cm.services.hotkeyService', [])
		.service('HotkeyService', HotKeyService);

	HotKeyService.$inject = ['hotkeys'];
	function HotKeyService(hotkeys) {
		
		var service = this;

		service.searchClient = searchClient;
		service.addClient = addClient;
		
		function addClient(callback) {
			hotkeys.add({
				combo: 'n+c', 
				description: 'Add new client', 
				callback: callback
			});
		}

		function searchClient(callback) {
			hotkeys.add({
				combo: 's',
				description: 'Search clients',
				callback: callback
			});
		}
	}

})();