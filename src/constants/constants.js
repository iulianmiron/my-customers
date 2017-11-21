(function() {
    'use strict'

    angular
        .module('cm.constants', [])
        .constant('NO_PICTURE', 'img/no-picture.png')
        .constant('SIDEBAR_MENU_ITEMS', [
            { icon: 'search', label: 'Cauta Clienti', url: 'home'}, 
            { icon: 'store', label: 'Shop', url: 'shop'}, 
            { icon: 'settings', label: 'Settings', url: 'settings'},
            { icon: 'account_balance', label: 'Plata', url: 'bankAccount'}
        ])
        .constant('CLIENT_VIP_TYPES', [
            { id: 1, label: 'Membru Familie' },
            { id: 2, label: 'Blogger' },
            { id: 3, label: 'Personalitate TV' },
            { id: 4, label: 'Ziarist' },
            { id: 5, label: 'Clienta veche' }
        ])
        .constant('CLIENT_VIP_LEVELS', [
            { id: 1, label: 'low' },
            { id: 2, label: 'normal' },
            { id: 3, label: 'high' },
            { id: 4, label: 'very-high' }
        ])
        .constant('USERS', [
            { id: 1, first_name: 'Elena', last_name: 'Miron' },
            { id: 2, first_name: 'Carmen', last_name: 'Bondric' },
            { id: 3, first_name: 'Madalina', last_name: 'Marc' }
        ]);
})();


// "5a13583dd024ec129cbef931", "Stilizare Sprancene"

// "5a135d49d024ec129cbef932", "Tratament Cosmetic"

// "5a135d55d024ec129cbef933", "Extensii Gene"

// "5a135d5cd024ec129cbef934", "Epilat"