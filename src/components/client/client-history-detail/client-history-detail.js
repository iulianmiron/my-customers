(function () {
    'use strict';

    angular
        .module('cm.components.clientHistoryDetail', [])
        .component('clientHistoryDetail', {
            templateUrl: '/components/client/client-history-detail/client-history-detail.html',
            controller: ClientHistoryDetailController,
            bindings: {}
        });

    function ClientHistoryDetailController () {
    	var ctrl = this;
        
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};
        
    }

    ClientHistoryDetailController.$inject = [];
})();