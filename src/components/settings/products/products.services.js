(function() {
    'use strict';

    angular
        .module('cm.services.settings.products', [])
        .service('ProductsServices', ProductsServices);

    function ProductsServices($http, $log) {
        var service = this;

        service.addProduct = addProduct;
        service.getAllProducts = getAllProducts;
        service.updateProduct = updateProduct;
        service.deleteProduct = deleteProduct;

        function addProduct(newProduct) {
            return $http.post('/products', newProduct).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                $log.error('Could not add product', error);
            });
        }

        function getAllProducts() {
            return $http.get('/products').then(function(rProducts) {
                return rProducts.data;
            }).catch(function(error) {
                console.log('Could not get all products', error);
            });
        }

        function updateProduct(product) {
            return $http.put('/products/' + product._id, product).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not update product', error);
            });
        }

        function deleteProduct(productId) {
            return $http.delete('/products/' + productId).then(function(rSuccess) {
                return rSuccess.data;
            }).catch(function(error) {
                console.log('Could not delete product', error);
            });
        }
    }

    ProductsServices.$inject = ['$http', '$log'];
})();