(function() {
    'use strict';

    angular
        .module('cm.components.clientHistoryDialog', [])
        .controller('ClientHistoryDialogController', ClientHistoryDialogController);
        
    ClientHistoryDialogController.$inject = ['$element', '$mdDialog', 'dialogData', 'USERS', 'PAYMENT_METHODS'];
    function ClientHistoryDialogController($element, $mdDialog, dialogData, USERS, PAYMENT_METHODS) {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.data.showCardContent = [];
        ctrl.data.maxDate = new Date();
        ctrl.data.users = USERS;
        ctrl.data.paymentMethods = PAYMENT_METHODS;
        ctrl.data.title = dialogData.title;
        ctrl.data.services = dialogData.services;
        ctrl.data.serviceTypes = dialogData.serviceTypes;
        ctrl.data.historyItem = dialogData.historyItem;
        ctrl.data.historyItem.performedServices = ctrl.data.historyItem.performedServices || addServicesByStaff(ctrl.data.historyItem);
        ctrl.data.historyItem.payment = ctrl.data.historyItem.payment || {paidAmounts: []};

        ctrl.data.historyItem.performedServices = fixDate(ctrl.data.historyItem.performedServices);
        
        ctrl.actions.changeSelectedServicesText = changeSelectedServicesText;

        ctrl.actions.setTotalCost = setTotalCost;
        ctrl.actions.setTotalCostWithDiscount = setTotalCostWithDiscount;
        ctrl.actions.setTotalPaid = setTotalPaid;

        ctrl.actions.addPaymentMethod = addPaymentMethod;
        ctrl.actions.deletePaymentMethod = deletePaymentMethod;
        ctrl.actions.addServicesByStaff = addServicesByStaff;
        ctrl.actions.deleteServicesByStaff = deleteServicesByStaff;

        ctrl.actions.showCardContent = showCardContent;
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

        function setTotalCost(servicesByStaff) {
            if(servicesByStaff.services) {
                servicesByStaff.cost = servicesByStaff.services.reduce(function(acc, curr) {
                    return acc + curr.price;
                }, 0);
            } else {
                servicesByStaff.cost = 0;
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
            ctrl.data.historyItem.payment.discount = ctrl.data.historyItem.performedServices.reduce(function(acc, curr) {
                return acc + curr.discount;
            }, 0);
        }

        function setTotalCostPerSession() {
            ctrl.data.historyItem.payment.total = ctrl.data.historyItem.performedServices.reduce(function(acc, curr) {
                return acc + curr.total;
            }, 0);
        }

        function addServicesByStaff(historyItem) {
            historyItem.performedServices = angular.isArray(historyItem.performedServices) ? historyItem.performedServices : [];
            historyItem.performedServices.push({
                services: null,
                staff: null,
                date: new Date()
            });
            historyItem.performedServices.map(function(item, index) {
                var boolean = !!(index === historyItem.performedServices.length - 1);
                showCardContent(index, boolean);
            });

            return historyItem.performedServices;
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

        function showCardContent(cardIndex, boolean) {
            ctrl.data.showCardContent[cardIndex] = typeof(boolean) === 'boolean' ? boolean : !ctrl.data.showCardContent[cardIndex];
        }

        function hideAllCardContent() {
            ctrl.data.showCardContent = ctrl.data.showCardContent.map(function(showCard) {
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