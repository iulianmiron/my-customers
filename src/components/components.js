(function() {
    'use strict';

    angular.module('cm.components', [
        'cm.components.common.appHeader',
        'cm.components.common.appSidebar',

        'cm.components.admin',
        'cm.components.admin.services',
        'cm.components.admin.products',
        'cm.components.admin.products.addProductDialog',
        'cm.components.admin.products.editProductDialog',
        'cm.components.admin.consumables',
        'cm.components.admin.consumables.editConsumableDialog',
        'cm.components.admin.consumables.addConsumableDialog',

        'cm.components.home',
        'cm.components.home.searchClients',

        'cm.components.client',
        'cm.components.clientProfile',
        'cm.components.clientHistoryDetail',
        'cm.components.clientHistory',

        'cm.components.shop',
        'cm.components.shopProducts',
        'cm.components.shopBasket'
    ]);
})();