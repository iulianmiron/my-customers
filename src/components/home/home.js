(function(){
	'use strict';

	angular
		.module('cm.components.home', [])
		.component('home', {
			templateUrl: '/components/home/home.html',
			controller: HomeController,
			bindings: {}
		});

		function HomeController() {
			var ctrl = this;

			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};
		}

		HomeController.$inject = [];
})();