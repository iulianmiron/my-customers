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

		function _add(hotkeyData) {
			hotkeys.add({
				combo: hotkeyData.combo,
				description: hotkeyData.description,
				callback: hotkeyData.callback
			});	
		}
		
		function addClient(callback) {
			_add({
				combo: 'n+c', 
				description: 'Add new client', 
				callback: callback
			});
		}

		function searchClient(callback) {
			_add({
				combo: 's',
				description: 'Search clients',
				callback: callback
			});
		}
	}

})();