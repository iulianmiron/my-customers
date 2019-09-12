(function() {
	'use strict';

	angular
		.module('cm')
		.config(appTheming);

	appTheming.$inject = ['$mdThemingProvider'];
	function appTheming($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('purple')
			.accentPalette('blue');

		// red, 
		// pink, 
		// purple, 
		// deep-purple, 
		// indigo, 
		// blue, 
		// light-blue, 
		// cyan, 
		// teal, 
		// green, 
		// light-green, 
		// lime, 
		// yellow, 
		// amber, 
		// orange, 
		// deep-orange, 
		// brown, 
		// grey, 
		// blue-grey
	}

})();