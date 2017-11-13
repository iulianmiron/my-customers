(function() {
    'use strict';

    angular.module('cm.components', [
        'cm.components.common.appHeader',
        'cm.components.common.appSidebar',
        'cm.components.common.clientSearch',

        'cm.components.admin',
        'cm.components.admin.services',
        'cm.components.admin.products',
        'cm.components.admin.products.addProductDialog',
        'cm.components.admin.products.editProductDialog',
        'cm.components.admin.consumables',
        'cm.components.admin.consumables.consumableDialog',
        'cm.components.admin.activities',

        'cm.components.home',
        'cm.components.home.searchClients',

        'cm.components.client',
        'cm.components.clientProfile',
        'cm.components.clientHistory',
        'cm.components.clientHistoryDialog',    

        'cm.components.shop',
        'cm.components.shopProducts',
        'cm.components.shopBasket',

        'cm.components.bankAccount'
    ]);
})();