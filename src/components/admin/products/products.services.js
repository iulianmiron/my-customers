(function() {
    'use strict';

    angular
        .module('cm.services.admin.products', [])
        .service('ProductsServices', ProductsServices);

        function ProductsServices($http, $log) {
            var service = this;

            service.addProduct			= addProduct;
            service.getAllProducts		= getAllProducts;
            service.updateService       = updateService;
			service.deleteService 		= deleteService;

            function addProduct(newProduct) {
				return $http.post('/products', newProduct).then(function(rSuccess){
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

            function updateService(service) {
                return $http.put('/services/' + service._id, service).then(function(rSuccess) {
					return rSuccess.data;
				}).catch(function(error) {
					console.log('Could not update client', error);
				});
            }

			function deleteService(serviceId) {
				return $http.delete('/services/' + serviceId).then(function(rSuccess){
					return rSuccess.data;
				}).catch(function(error) {
					console.log('Could not delete service', error);
				});
			}
        }

        ProductsServices.$inject  = ['$http', '$log'];
})();