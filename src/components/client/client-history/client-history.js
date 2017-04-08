(function () {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {}
        });

    function ClientHistoryController ($http, ClientHistoryService) {
        var ctrl = this;
        
        ctrl.data     = {};
        ctrl.status   = {};
        ctrl.actions  = {};

        ClientHistoryService.getHistory().then(function(rClientHistory) {
            console.log("rClientHistory", rClientHistory);

            ctrl.data.clientHistory = rClientHistory;
        });


        
    }

    ClientHistoryController.$inject = ['$http', 'ClientHistoryService'];
})();