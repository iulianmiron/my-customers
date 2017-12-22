(function() {
    'use strict';

    angular
        .module('cm.dataservices.products', [])
        .service('ProductsDataService', ProductsDataService);

        ProductsDataService.$inject = ['$http'];
    function ProductsDataService($http) {
        var service = this;

        service.addProduct = addProduct;
        service.getAllProducts = getAllProducts;
        service.updateProduct = updateProduct;
        service.deleteProduct = deleteProduct;

        function addProduct(newProduct) {
            return $http.post('/api/products', newProduct)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.error('Could not add product', error);
                });
        }

        function getAllProducts() {
            return $http.get('/api/products')
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not get all products', error);
                });
        }

        function updateProduct(product) {
            return $http.put('/api/products/' + product._id, product)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not update product', error);
                });
        }

        function deleteProduct(productId) {
            return $http.delete('/api/products/' + productId)
                .then(_handleSuccess)
                .catch(function(error) {
                    console.log('Could not delete product', error);
                });
        }

        function _handleSuccess(response){
            return response.data;
        }
    }
})();