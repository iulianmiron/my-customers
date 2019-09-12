(function() {
	'use strict';

	angular
		.module('cm.services.utilsService', [])
		.service('UtilsService', UtilsService);

	UtilsService.$inject = ['clipboard', 'toastr'];
	function UtilsService(clipboard, toastr) {
		
		var service = this;

		service.getSelectedItems = getSelectedItems;
		service.isToday = isToday;
		service.isRouteDateToday = isRouteDateToday;
		service.getAge = getAge;
		service.copyToClipboard = copyToClipboard;

		function getSelectedItems(allItems, selectedItems) {
            if(allItems && selectedItems && angular.isArray(selectedItems)) {
                return _matchSelection(allItems, selectedItems);
            } else if(allItems && selectedItems && angular.isString(selectedItems)) {
				return _matchSelection(allItems, selectedItems)[0];
			} else {
				return null;
			}
		}
		
		function _matchSelection(allItems, selectedItems) {
			return allItems.filter(function(item) {
				return selectedItems.indexOf(item._id) !== -1;
			});
		}

		function isToday(date) {
			return moment().isSame(date, 'day');
		}  
		
        function isRouteDateToday(routeDate) {
			return routeDate === moment().format('DD-MM-Y');
		}
		function getAge(dateOfBirth) {
			return moment().diff(moment(dateOfBirth), 'years');
		}

		function copyToClipboard(data, title) {
			title = title || 'Info';
            if(data) {
                clipboard.copyText(data);
                toastr.success(title + ' copiat in clipboard!');
            } else {
                toastr.warning('Nimic de copiat!');
            }
		}
	}

})();