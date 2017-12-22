(function() {
    'use strict';

    angular
        .module('cm.dataservices', [
            'cm.dataservices.products',
            'cm.dataservices.services',
            'cm.dataservices.serviceTypes',
            'cm.dataservices.history',
            'cm.dataservices.clients',
            'cm.dataservices.consumables',
            'cm.dataservices.staff'
        ]);
})();