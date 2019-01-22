(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);
        
    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData', 'USERS', 'PAYMENT_METHODS', 'SALON_ROOMS', 'HotkeyService'];
    function ClientHistoryDialogController($element, $mdDialog, dialogData, USERS, PAYMENT_METHODS, SALON_ROOMS, HotkeyService) {
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
        ctrl.data.lastHistoryItemPerformedServices = dialogData.lastHistoryItem && dialogData.lastHistoryItem.performedServices;

        ctrl.data.historyItem.performedServices = ctrl.data.historyItem.performedServices || addServicesByStaff(ctrl.data.historyItem);
        ctrl.data.historyItem.performedServices = fixDate(ctrl.data.historyItem.performedServices);
        ctrl.data.historyItem.soldProducts = fixDate(ctrl.data.historyItem.soldProducts);
        ctrl.data.historyItem.payment = ctrl.data.historyItem.payment || { paidAmounts: [] };
        
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;


        ctrl.actions.setServicesCost = setServicesCost;
        ctrl.actions.setProductsCost = setProductsCost;
        ctrl.actions.setDiscount = setDiscount;

        ctrl.actions.setTotalPaid = setTotalPaid;
        ctrl.actions.setTotalPayable = setTotalPayable;

        ctrl.actions.addPaymentMethod = addPaymentMethod;
        ctrl.actions.deletePaymentMethod = deletePaymentMethod;

        ctrl.actions.addServicesByStaff = addServicesByStaff;
        ctrl.actions.deleteServicesByStaff = deleteServicesByStaff;

        ctrl.actions.addSoldProductsByStaff = addSoldProductsByStaff;
        ctrl.actions.deleteSoldProductsByStaff = deleteSoldProductsByStaff;

        ctrl.actions.addSoldProduct = addSoldProduct;
        ctrl.actions.deleteSoldProduct = deleteSoldProduct;        

        ctrl.actions.showCardContentServices = showCardContentServices;
        ctrl.actions.showCardContentProducts = showCardContentProducts;

        ctrl.actions.copyLastSessionServices = copyLastSessionServices;
        ctrl.status.isPaidInFull = isPaidInFull;
        ctrl.actions.showHidePaymentCard = showHidePaymentCard;
        
        ctrl.actions.deleteSession = deleteSession;
        ctrl.actions.cancel = cancel;
        ctrl.actions.save = save;


        ctrl.data.timePickerMessages = {
            hour: 'Hour is required',
            minute: 'Minute is required',
            meridiem: 'Meridiem is required'
        };

        $element.find('input').on('keydown', function(ev) { ev.stopPropagation(); });

        HotkeyService.save(saveClientHistoryItem);

        function saveClientHistoryItem(event) {
            event.preventDefault();
            if(!(ctrl.data.addServicesByStaffForm.$invalid || !(ctrl.data.historyItem.performedServices.length || ctrl.data.historyItem.soldProducts.length))) {
                ctrl.actions.save(ctrl.data.historyItem);
            } 
            
        }

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
            $mdDialog.hide(historyItem);
        };

        function changeSelectedServicesText(selectedServices) {
            return (selectedServices && selectedServices.length) 
                ? selectedServices.length > 1 
                    ? selectedServices.length + ' servicii selectate.'
                    : selectedServices.length + ' serviciu selectat'
                : 'Nu sunt servicii selectate';            
        };

        function setServicesCost(servicesStaff) {
            if(servicesStaff.services && servicesStaff.services.length) {
                servicesStaff.cost = servicesStaff.services.reduce(function(acc, curr) {
                    return acc + curr.price;
                }, 0);
            } else {
                servicesStaff.cost = 0;
            }
            setDiscount(servicesStaff);
        }

        function setProductsCost(productsStaff) {
            if(productsStaff.products && productsStaff.products.length) {
                productsStaff.cost = productsStaff.products.reduce(function(acc, curr) {
                    if(curr.price && curr.quantity) {
                        return acc + (curr.price * curr.quantity);
                    }
                    return acc;
                }, 0);
            } else {
                productsStaff.cost = 0;
            }
            setDiscount(productsStaff);
        }

        function setDiscount(section) {
            var cost = section.cost || 0;
            var discount = section.discount || 0;

            section.discount = discount > cost ? cost : discount;  
            section.total = section.cost - section.discount;
            setTotalDiscountPerSession(ctrl.data.historyItem);
            setTotalCostPerSession(ctrl.data.historyItem);
        }

        function setTotalDiscountPerSession(historyItem) {
            if(historyItem.performedServices && historyItem.performedServices.length) {
                historyItem.payment.discountServices = historyItem.performedServices.reduce(discountReducer, 0);
            } else {
                historyItem.payment.discountServices = 0;
            }
            if(historyItem.soldProducts && historyItem.soldProducts.length) {
                historyItem.payment.discountProducts = historyItem.soldProducts.reduce(discountReducer, 0);
            } else {
                historyItem.payment.discountProducts = 0;
            }
            function discountReducer(acc, curr) {
                return acc + curr.discount;
            }

            historyItem.payment.discountTotal = historyItem.payment.discountServices + historyItem.payment.discountProducts;
        }

        function setTotalCostPerSession(historyItem) {
            if(historyItem.performedServices && historyItem.performedServices.length) {
                historyItem.payment.costServices = historyItem.performedServices.reduce(costReducer, 0);
            } else {
                historyItem.payment.costServices = 0;
            }
            if(historyItem.soldProducts && historyItem.soldProducts.length) {
                historyItem.payment.costProducts = historyItem.soldProducts.reduce(costReducer, 0);
            } else {
                historyItem.payment.costProducts = 0;
            }
            function costReducer(acc, curr) {
                return acc + curr.cost;
            }

            historyItem.payment.total = historyItem.payment.costServices + historyItem.payment.costProducts - historyItem.payment.discountTotal;
        }

        function setTotalPaid(paidAmounts) {
            ctrl.data.historyItem.payment.paidAmount = paidAmounts.reduce(function(acc, curr) {
                return angular.isNumber(curr.total) ? (acc + curr.total) : acc;
            }, 0);
        }

        function setTotalPayable(paidAmount, amountPayable) {
            paidAmount.total = amountPayable;
            ctrl.actions.setTotalPaid(ctrl.data.historyItem.payment.paidAmounts)
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

        function deleteSoldProduct(soldProductsByStaff, index) {
            soldProductsByStaff.products.splice(index, 1);
            setProductsCost(soldProductsByStaff);
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
            setTotalDiscountPerSession(ctrl.data.historyItem);
            setTotalCostPerSession(ctrl.data.historyItem);
        }

        function deleteSoldProductsByStaff(soldProducts, index) {
            soldProducts.splice(index, 1);
            setTotalDiscountPerSession(ctrl.data.historyItem);
            setTotalCostPerSession(ctrl.data.historyItem);
        }

        function isPaidInFull(payment) {
            if(payment) {
                return payment.total === payment.paidAmount ? 'vip-text very-high' : 'vip-text low';
            }
        }

        function copyLastSessionServices(lastHistoryItemPerformedServices) {
            ctrl.data.historyItem.performedServices = angular.copy(lastHistoryItemPerformedServices);
            ctrl.data.historyItem.performedServices.map(function(serviceByStaff) {
                serviceByStaff.date = new Date();
                serviceByStaff.discount = 0;
                serviceByStaff.total = serviceByStaff.cost;
            });
            setTotalDiscountPerSession(ctrl.data.historyItem);
            setTotalCostPerSession(ctrl.data.historyItem);
        }
    }
})();