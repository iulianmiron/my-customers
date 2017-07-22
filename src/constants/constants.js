(function() {
    'use strict'

    angular
        .module('cm.constants', [])
        .constant('SERVICE_TYPES', [
            { id: 1, name: 'Stilizare Sprancene' },
            { id: 2, name: 'Tratament Cosmetic' },
            { id: 3, name: 'Extensii Gene' },
            { id: 4, name: 'Epilat' }
        ])
        .constant('NO_PICTURE', 'img/no-picture.png')
        .constant('SIDEBAR_MENU_ITEMS', [{
            icon: 'search',
            label: 'Cauta Clienti',
            url: 'home'
        }, {
            icon: 'store',
            label: 'Shop',
            url: 'shop'
        }, {
            icon: 'settings',
            label: 'Admin',
            url: 'admin'
        }]);
})();