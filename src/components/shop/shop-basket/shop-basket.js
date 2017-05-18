(function() {
	'use strict';

	angular
		.module('cm.components.shopBasket', [])
		.component('shopBasket', {
			templateUrl: '/components/shop/shop-basket/shop-basket.html',
			controller: ShopBasketController,
			bindings: {
				shopBasket: '<',
			}
		});

		function ShopBasketController(NO_PICTURE) {
			var ctrl = this;

			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.$onChanges = function(changes) {
				if(changes.shopBasket && changes.shopBasket.currentValue) {
					ctrl.data.shopBasket = angular.copy(changes.shopBasket.currentValue);
					ctrl.data.totalPrice = calculateTotalPrice(ctrl.data.shopBasket);
				}
			}
			ctrl.$onInit = function() {
				ctrl.data.noPicture = NO_PICTURE;

				ctrl.actions.removeFromBasket = removeFromBasket;
			}

			function removeFromBasket(product) {
				//remove product
			}

			function calculateTotalPrice(shopBasket) {
				return shopBasket.reduce(addPrice, 0);

				function addPrice(total, iProduct, ) {
					return iProduct.price + total;
				}
			}
		}

		ShopBasketController.$inject = ['NO_PICTURE'];
})();