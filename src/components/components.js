(function() {
    'use strict';

    angular.module('cm.components', [
        'cm.components.common.appHeader',
        'cm.components.common.appSidebar',
        'cm.components.common.appLoading',
        'cm.components.common.clientSearch',
        'cm.components.common.confirmDialog',
        
        'cm.components.settings',
        'cm.components.settings.services',
        'cm.components.settings.services.serviceDialog',
        'cm.components.settings.services.serviceTypeDialog',

        'cm.components.settings.products',
        'cm.components.settings.products.addProductDialog',
        'cm.components.settings.products.editProductDialog',
        'cm.components.settings.consumables',
        'cm.components.settings.consumables.consumableDialog',
        'cm.components.settings.activities',

        'cm.components.home',
        'cm.components.home.searchClients',

        'cm.components.client',
        'cm.components.clientProfile',
        'cm.components.clientProfileDialog',
        'cm.components.clientHistory',
        'cm.components.clientHistoryDialog',    

        'cm.components.shop',
        'cm.components.shopProducts',
        'cm.components.shopBasket',

        'cm.components.bankAccount',

        'cm.components.test'
    ]);
})();