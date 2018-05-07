(function() {
    'use strict';

    angular
        .module('cm.components.shop', [])
        .component('shop', {
            templateUrl: '/components/shop/shop.html',
            controller: ShopController,
            bindings: {}
        });

    ShopController.$inject = ['ProductsDataService'];
    function ShopController(ProductsDataService) {
        var ctrl = this;

        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.basket = [];

            ctrl.actions.getAllProducts = getAllProducts;
            ctrl.data.addToBasket = addToBasket;

            getAllProducts();
        }

        function getAllProducts() {
            ProductsDataService.getAll().then(function(rProducts) {
                ctrl.data.allProducts = rProducts;
            });
        }

        function addToBasket(event) {
            ctrl.data.basket.push(event.product)
            ctrl.data.basket = angular.copy(ctrl.data.basket);
        }
    }
})();