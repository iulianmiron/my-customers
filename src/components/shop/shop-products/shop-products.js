(function() {
	'use strict';

	angular
		.module('cm.components.shopProducts', [])
		.component('shopProducts', {
			templateUrl: '/components/shop/shop-products/shop-products.html',
			controller: ShopProductsController,
			bindings: {
				products: '<',
				onAddToBasket: '&'
			}
		});

		function ShopProductsController(NO_PICTURE) {
			var ctrl = this;

			ctrl.data = {};
			ctrl.status = {};
			ctrl.actions = {};

			ctrl.$onChanges = function(changes) {
				if(changes.products && changes.products.currentValue) {
					ctrl.data.allProducts = changes.products.currentValue;
				}
			}
			ctrl.$onInit = function() {
				ctrl.data.noPicture = NO_PICTURE;

				ctrl.actions.addToBasket = addToBasket;
			}

			function addToBasket(product) {
				ctrl.onAddToBasket({ $event: { product: product } });
			}
		}

		ShopProductsController.$inject = ['NO_PICTURE'];
})();