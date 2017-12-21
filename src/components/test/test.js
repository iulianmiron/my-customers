(function() {
	'use strict';

	angular
		.module('cm.components.test', [])
		.component('test', {
			templateUrl: 'components/test/test.html',
			controller: testController,
			bindings: {}
		});

		testController.$inject = [];
		function testController() {

		}
})();