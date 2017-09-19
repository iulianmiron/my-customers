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
        }])
        .constant('CLIENT_VIP_TYPES', [
            {
                id: 1,
                label: 'Membru Familie'
            },
            {
                id: 2,
                label: 'Blogger'
            },
            {
                id: 3,
                label: 'Personalitate TV'
            },
            {
                id: 4,
                label: 'Ziarist'
            },
            {
                id: 5,
                label: 'Clienta veche'
            }
        ])
        .constant('CLIENT_VIP_LEVELS', [
            {
                id: 1,
                label: 'Low'
            },
            {
                id: 2,
                label: 'Medium'
            },
            {
                id: 3,
                label: 'High'
            },
            {
                id: 4,
                label: 'Very High'
            }
        ])
        .constant('USERS', [
            {
                id: 1,
                first_name: 'Elena',
                last_name: 'Miron'
            },
            {
                id: 2,
                first_name: 'Carmen',
                last_name: 'Bondric',
            },
            {
                id: 3,
                first_name: 'Madalina',
                last_name: 'Marc'
            }
        ]);
})();