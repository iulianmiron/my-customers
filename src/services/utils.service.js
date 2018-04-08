(function() {
	'use strict';

	angular
		.module('cm.services.utilsService', [])
		.service('UtilsService', UtilsService);

	UtilsService.$inject = [];
	function UtilsService() {
		
		var service = this;

		service.getSelectedItems = getSelectedItems;

		function getSelectedItems(allItems, selectedItems) {
            if(allItems && selectedItems && angular.isArray(selectedItems)) {
                return _matchSelection(allItems, selectedItems);
            } else if(allItems && selectedItems && angular.isString(selectedItems)) {
				return _matchSelection(allItems, selectedItems)[0];
			}
		}
		
		function _matchSelection(allItems, selectedItems) {
			return allItems.filter(function(item) {
				return selectedItems.indexOf(item._id) !== -1;
			});
		}
	}

})();