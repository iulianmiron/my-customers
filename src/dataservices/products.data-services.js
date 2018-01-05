(function() {
    'use strict';

    angular
        .module('cm.dataservices.products', [])
        .service('ProductsDataService', ProductsDataService);

        ProductsDataService.$inject = ['$http'];
    function ProductsDataService($http) {
        var service = this;
        service.name = 'product';

        service.addProduct = addProduct;
        service.getAllProducts = getAllProducts;
        service.updateProduct = updateProduct;
        service.deleteProduct = deleteProduct;

        function addProduct(newProduct) {
            return $http.post('/api/products', newProduct)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function getAllProducts() {
            return $http.get('/api/products')
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function updateProduct(product) {
            return $http.put('/api/products/' + product._id, product)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function deleteProduct(productId) {
            return $http.delete('/api/products/' + productId)
                .then(_handleSuccess)
                .catch(_handleError);
        }

        function _handleSuccess(response){
            return response.data;
        }

        function _handleError(response) {
            var operation = response.config.method ? response.config.method.toLowerCase() : 'perform operation on';
            console.error('Could not ' + operation + ' ' + service.name);
            console.error('Error: ', response);
        }
    }
})();