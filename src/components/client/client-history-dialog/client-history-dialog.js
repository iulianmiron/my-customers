(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);
        
    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData', 'USERS', 'PAYMENT_METHODS', 'SALON_ROOMS'];
    function ClientHistoryDialogController($element, $mdDialog, dialogData, USERS, PAYMENT_METHODS, SALON_ROOMS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.showCardContentServices = [];
        ctrl.data.showCardContentProducts = [];
        ctrl.data.maxDate = new Date();
        ctrl.data.users = USERS;
        ctrl.data.paymentMethods = PAYMENT_METHODS;
        ctrl.data.salonRooms = SALON_ROOMS;
        ctrl.data.title = dialogData.title;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.historyItem = dialogData.historyItem;
        ctrl.data.historyItem.performedServices = ctrl.data.historyItem.performedServices || addServicesByStaff(ctrl.data.historyItem);
        ctrl.data.historyItem.payment = ctrl.data.historyItem.payment || {paidAmounts: []};
        ctrl.data.historyItem.performedServices = fixDate(ctrl.data.historyItem.performedServices);
        ctrl.data.historyItem.soldProducts = fixDate(ctrl.data.historyItem.soldProducts);
        
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;

        ctrl.actions.setTotalCost = setTotalCost;
        ctrl.actions.setTotalCostWithDiscount = setTotalCostWithDiscount;
        ctrl.actions.setTotalPaid = setTotalPaid;

        ctrl.actions.addPaymentMethod = addPaymentMethod;
        ctrl.actions.deletePaymentMethod = deletePaymentMethod;

        ctrl.actions.addServicesByStaff = addServicesByStaff;
        ctrl.actions.deleteServicesByStaff = deleteServicesByStaff;

        ctrl.actions.addSoldProductsByStaff = addSoldProductsByStaff;
        ctrl.actions.deleteSoldProductsByStaff = deleteSoldProductsByStaff;

        ctrl.actions.addSoldProduct = addSoldProduct;
        ctrl.actions.deleteSoldProduct = deleteSoldProduct;

        ctrl.actions.setTotalProductsCost = setTotalProductsCost;

        ctrl.actions.showCardContentServices = showCardContentServices;
        ctrl.actions.showCardContentProducts = showCardContentProducts;

        ctrl.status.isPaidInFull = isPaidInFull;
        ctrl.actions.showHidePaymentCard = showHidePaymentCard;
        
        ctrl.actions.deleteSession = deleteSession;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;


        ctrl.actions.test = function(form) {
            console.log(form);
        }

        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        function fixDate(performedServices) {
            return angular.forEach(performedServices, function(servicesByStaff) {
                servicesByStaff.date = new Date(servicesByStaff.date);
            });
        }

        function deleteSession(historyItem) {
            $mdDialog.cancel({item: historyItem, command: 'delete'});
        }

        function cancel() {
            $mdDialog.cancel();
        };

        function save(historyItem) {
            console.log('$ctrl.data.historyItem:', historyItem);
            $mdDialog.hide(historyItem);
        };

        function changeSelectedServicesText(selectedServices) {
            return (selectedServices && selectedServices.length) 
                ? selectedServices.length > 1 
                    ? selectedServices.length + ' servicii selectate.'
                    : selectedServices.length + ' serviciu selectat'
                : 'Nu sunt servicii selectate';            
        };

        function setTotalProductsCost(soldProducts) {
            if(soldProducts.products && soldProducts.products.length) {
                
                soldProducts.cost = soldProducts.products.reduce(function(acc, curr) {
                    if(curr.price && curr.quantity) {
                        return acc + (curr.price * curr.quantity);
                    }
                    return acc;
                }, 0);
            } else {
                soldProducts.cost = 0;
            }
            setTotalProductsCostWithDiscount(soldProducts);
        }

        function setTotalProductsCostWithDiscount(soldProducts) {
            var cost = soldProducts.cost || 0;
            var discount = soldProducts.discount || 0;
            
            discount = discount > cost ? cost : discount;
            soldProducts.discount = discount;
            soldProducts.total = cost - discount;

            setTotalDiscountPerSession();
            setTotalCostPerSession();
        }

        function setTotalCost(servicesByStaff) {
            if(servicesByStaff.services) {
                servicesByStaff.cost = servicesByStaff.services.reduce(function(acc, curr) {
                    return acc + curr.price;
                }, 0);
            }

            setTotalCostWithDiscount(servicesByStaff);
        }

        function setTotalCostWithDiscount(servicesByStaff) {
            var cost = servicesByStaff.cost || 0;
            var discount = servicesByStaff.discount || 0;
            
            discount = discount > cost ? cost : discount;
            servicesByStaff.discount = discount;
            servicesByStaff.total = cost - discount;

            setTotalDiscountPerSession();
            setTotalCostPerSession();
        }

        function setTotalDiscountPerSession() {
            if(ctrl.data.historyItem.performedServices && ctrl.data.historyItem.performedServices) {
                ctrl.data.historyItem.payment.discountServices = ctrl.data.historyItem.performedServices.reduce(function(acc, curr) {
                    return acc + curr.discount;
                }, 0);
            }

            if(ctrl.data.historyItem.soldProducts && ctrl.data.historyItem.soldProducts.length) {
                ctrl.data.historyItem.payment.discountProducts = ctrl.data.historyItem.soldProducts.reduce(function(acc, curr) {
                    return acc + curr.discount;
                }, 0);
            }
        }

        function setTotalCostPerSession() {
            if(ctrl.data.historyItem.performedServices && ctrl.data.historyItem.performedServices.length) {
                ctrl.data.historyItem.payment.totalServices = ctrl.data.historyItem.performedServices.reduce(function(acc, curr) {
                    return acc + curr.total;
                }, 0);
            } else {
                ctrl.data.historyItem.payment.totalServices = 0;
            }

            if(ctrl.data.historyItem.soldProducts && ctrl.data.historyItem.soldProducts.length) {
                ctrl.data.historyItem.payment.totalProducts = ctrl.data.historyItem.soldProducts.reduce(function(acc, curr) {
                    return acc + curr.total;
                }, 0);
            } else {
                ctrl.data.historyItem.payment.totalProducts = 0;
            }
            ctrl.data.historyItem.payment.total = ctrl.data.historyItem.payment.totalServices + ctrl.data.historyItem.payment.totalProducts;
        }

        function addServicesByStaff(historyItem) {
            historyItem.performedServices = angular.isArray(historyItem.performedServices) ? historyItem.performedServices : [];
            historyItem.performedServices.push({
                services: null,
                staff: null,
                date: new Date()
            });

            hideAllCardContent();
            historyItem.performedServices.map(function(item, index) {
                var boolean = !!(index === historyItem.performedServices.length - 1);
                showCardContentServices(index, boolean);
            });

            return historyItem.performedServices;
        }

        function addSoldProductsByStaff(historyItem) {
            historyItem.soldProducts = angular.isArray(historyItem.soldProducts) ? historyItem.soldProducts : [];
            historyItem.soldProducts.push({
                staff: null,
                products: [],
                date: new Date()
            });
            hideAllCardContent();

            historyItem.soldProducts.map(function(item, index) {
                var boolean = !!(index === historyItem.soldProducts.length - 1);
                showCardContentProducts(index, boolean);
            });
            return historyItem.soldProducts;
        }

        function addSoldProduct(soldProductsByStaffProducts) {
            soldProductsByStaffProducts.push({
                code: null,
                name: null,
                quantity: 1,
                price: 0
            });
        }

        function deleteSoldProduct(soldProductsByStaffProducts, index) {
            soldProductsByStaffProducts.splice(index, 1);
        }

        function addPaymentMethod(paidAmounts) {
            paidAmounts.push({
                type: {},
                total: 0
            });
        }

        function deletePaymentMethod(paidAmounts, index) {
            paidAmounts.splice(index, 1);
            setTotalPaid(paidAmounts);
        }

        function showCardContentServices(cardIndex, boolean) {
            ctrl.data.showCardContentServices[cardIndex] = 
                typeof(boolean) === 'boolean' 
                    ? boolean 
                    : !ctrl.data.showCardContentServices[cardIndex];
        }

        function showCardContentProducts(cardIndex, boolean) {
            ctrl.data.showCardContentProducts[cardIndex] = 
                typeof(boolean) === 'boolean' 
                    ? boolean 
                    : !ctrl.data.showCardContentProducts[cardIndex];
        }

        function hideAllCardContent() {
            ctrl.data.showCardContentServices = ctrl.data.showCardContentServices.map(function(showCard) {
                return showCard = false;
            });
            ctrl.data.showCardContentProducts = ctrl.data.showCardContentProducts.map(function(showCard) {
                return showCard = false;
            });
        }

        function showHidePaymentCard(showPaymentCard) {
            ctrl.status.showPaymentCard = !showPaymentCard;
            hideAllCardContent();
        }

        function deleteServicesByStaff(performedServices, index) {
            performedServices.splice(index, 1);
            setTotalDiscountPerSession();
            setTotalCostPerSession();
        }

        function deleteSoldProductsByStaff(soldProducts, index) {
            soldProducts.splice(index, 1);
            setTotalDiscountPerSession();
            setTotalCostPerSession();
        }


        function setTotalPaid(paidAmounts) {
            ctrl.data.historyItem.payment.paidAmount = paidAmounts.reduce(function(acc, curr) {
                return angular.isNumber(curr.total) ? (acc + curr.total) : acc;
            }, 0);
        }

        function isPaidInFull(total, paid) {
            return total === paid ? 'vip-text very-high' : 'vip-text low';
        }
    }
})();