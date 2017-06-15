(function() {
    'use strict';

    angular
        .module('cm.components.admin.products', [])
        .component('products', {
            templateUrl: '/components/admin/products/products.html',
            controller: ProductsController,
            bindings: {}
        });

    function ProductsController($mdDialog, $rootElement, ProductsServices, toastr, NO_PICTURE) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
            ctrl.data.noPicture = NO_PICTURE;

            ctrl.actions.addProduct = addProduct;
            ctrl.actions.getAllProducts = getAllProducts;
            ctrl.actions.deleteProduct = deleteProduct;
            ctrl.actions.selectProduct = selectProduct;
            ctrl.actions.editProduct = editProduct;

            getAllProducts();
        }

        function addProduct(event) {
            $mdDialog.show({
                controller: 'AddProductDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/admin/products/add-product/add-product.dialog.html',
                locals: {
                    serviceTypes: ctrl.data.serviceTypes
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(product) {
                saveNewProduct(product);
            }, function() {
                //no product added
            });
        }

        function saveNewProduct(newProduct) {
            ProductsServices.addProduct(newProduct).then(function(rSuccess) {
                toastr.success("Produsul adaugat cu succes");
                return rSuccess.data;
            });
            getAllProducts();
        }

        function getAllProducts() {
            ProductsServices.getAllProducts().then(function(rProducts) {
                ctrl.data.allProducts = rProducts;
            });
        }

        function deleteProduct(productId) {
            ProductsServices.deleteProduct(productId).then(function(rSuccess) {
                toastr.success("Produsul sters cu succes");
                return rSuccess.data;
            });
            getAllProducts();
        }

        function selectProduct(event, product) {
            $mdDialog.show({
                controller: 'EditProductDialogController',
                controllerAs: '$ctrl',
                templateUrl: '/components/admin/products/edit-product/edit-product.dialog.html',
                locals: {
                    product: angular.copy(product)
                },
                parent: $rootElement,
                targetEvent: event,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function(product) {
                editProduct(product);
            }, function() {
                //product edit cancelled
            });
        }

        function editProduct(product) {
            ProductsServices.updateProduct(product).then(function(rSuccess) {
                toastr.success("Produsul editat cu succes");
                return rSuccess.data;
            });
            getAllProducts();
        }
    }

    ProductsController.$inject = ['$mdDialog', '$rootElement', 'ProductsServices', 'toastr', 'NO_PICTURE'];
})();