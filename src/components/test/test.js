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
			var ctrl = this;
			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.actions.updateRating = updateRating;
		}

		function updateRating(event) {
			console.log('update rating event: ', event.selectedRating);
		}
})();