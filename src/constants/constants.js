(function() {
    'use strict'

    angular
        .module('cm.constants', [])
        .constant('NO_PICTURE', 'img/no-picture.png')
        .constant('SIDEBAR_MENU_ITEMS', [
            { icon: 'search', label: 'Cauta Clienti', url: 'home'}, 
            { icon: 'today', label: 'Programari', url: 'calendar'}, 
            { icon: 'store', label: 'Shop', url: 'shop'}, 
            { icon: 'settings', label: 'Settings', url: 'services'},
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
            { id: 2, first_name: 'Madalina', last_name: 'Marc' }
        ])
        .constant('PAYMENT_METHODS', [
            { id: 1, name: 'Cash', icon: 'euro_symbol' },
            { id: 2, name: 'Card', icon: 'credit_card' },
            { id: 3, name: 'Transfer Cont', icon: 'account_balance' },
        ])
        .constant('SALON_ROOMS', [
            { id: 1, name: 'Baroc', type: 'service', max_clients: 2, icon: 'spa' },
            { id: 2, name: 'Pastel', type: 'service', max_clients: 1, icon: 'spa' },
            { id: 3, name: 'Romantic', type: 'service', max_clients: 1, icon: 'spa' },
            { id: 4, name: 'Klimt', type: 'service', max_clients: 2, icon: 'spa' },
            { id: 5, name: 'Waiting Room', type: 'waiting', icon: 'weekend' },
            { id: 6, name: 'Office', type: 'administrative', icon: 'laptop' },
        ]);
})();