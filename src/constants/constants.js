(function() {
	'use strict'

	angular
		.module('cm.constants', [])
		.constant('SERVICE_TYPES', [
			{id: 1, name: 'Stilizare Sprancene'},
			{id: 2, name: 'Tratament Cosmetic'},
			{id: 3, name: 'Extensii Gene'},
			{id: 4, name: 'Epilat'}
		])
		.constant('NO_PICTURE', 'img/no-picture.png');
})();