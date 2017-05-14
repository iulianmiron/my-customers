(function () {
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
        ctrl.data       = {};
        ctrl.status     = {};
        ctrl.actions    = {};

        ctrl.$onInit = function() {
            ctrl.data.noPicture = NO_PICTURE;

            ctrl.actions.selectService = selectService;
            ctrl.actions.editService = editService;
            ctrl.actions.deleteService = deleteService;


            ctrl.actions.addProduct = addProduct;
            ctrl.actions.getAllProducts = getAllProducts;

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
                console.log('product', product);
                saveNewProduct(product);
            }, function() {
                console.log('no product');
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













        function selectService(service) {
            ctrl.data.newService = angular.copy(service);
            ctrl.status.showEditServiceControls = true;
        }

        function editService(service) {
            ProductsServices.updateService(service).then(function(rSuccess) {
                toastr.success("Serviciul editat cu succes");
                return rSuccess.data;
            });
            getAllServices();
            
        }

        function deleteService(serviceId) {
            ProductsServices.deleteService(serviceId).then(function(rSuccess) {
                toastr.success("Serviciul sters cu succes");
                return rSuccess.data;
            });
            getAllServices();
        }

    }

    ProductsController.$inject = ['$mdDialog', '$rootElement', 'ProductsServices', 'toastr', 'NO_PICTURE'];
})();