(function() {
    'use strict';

    angular
        .module('cm.components.common.productSearch', [])
        .component('productSearch', {
            templateUrl: '/components/common/product-search/product-search.html',
            controller: ProductSearchController,
            bindings: {
                show: '<',
                showClearButton: '<',
                defaultSelection: '<',
                onBlur: '&',
                onSelection: '&'
            }
        });
        
    ProductSearchController.$inject = ['$q', 'ProductsDataService'];
    function ProductSearchController($q, ProductsDataService) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if(changes.show && changes.show.currentValue) {
                ctrl.status.show = angular.copy(changes.show.currentValue);
            }
            if(changes.showClearButton && changes.showClearButton.currentValue) {
                ctrl.status.showClearButton = angular.copy(changes.showClearButton.currentValue);
            }
            if(changes.defaultSelection && changes.defaultSelection.currentValue && !angular.equals(changes.defaultSelection.currentValue, changes.defaultSelection.previousValue)) {
                ctrl.data.selectedItem = angular.copy(changes.defaultSelection.currentValue);
            }
        }
        ctrl.$onInit = function() {
            ctrl.actions.searchProducts = searchProducts;
            ctrl.actions.onSelection = onSelection;
            ctrl.actions.hideSearch = hideSearch;
        }

        function searchProducts(query) {
            var deferred = $q.defer();

            ProductsDataService
                .searchAll(query)
                .then(handleSuccess)
                .catch(handleError);

            function handleSuccess(rProducts) {
                deferred.resolve(rProducts);
            }

            function handleError(rErrorMessage) {
                console.error('Could not get products', rErrorMessage);
                deferred.reject(rErrorMessage);
            }
            return deferred.promise;
        }

        function onSelection(product) {
            ctrl.onSelection({$event: {product: product}});
        }

        function hideSearch(hideSearch) {
            ctrl.onBlur({ $event: {hideSearch: hideSearch} });
        }
    }
})();