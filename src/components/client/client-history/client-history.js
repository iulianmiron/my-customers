(function () {
    'use strict';

    angular
        .module('cm.components.clientHistory', [])
        .component('clientHistory', {
            templateUrl: '/components/client/client-history/client-history.html',
            controller: ClientHistoryController,
            bindings: {}
        });

    function ClientHistoryController () {
    	var ctrl = this;
        
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};
        
        
        ctrl.data.clientHistory = [{
          							date: "12/02/2000",
          							service: 'tratament',
          							pictures: 4,
          							movies: 6
                                   },
                                   {
           							date: "12/02/2000",
           							service: 'tratament',
           							pictures: 4,
           							movies: 6
                                   },
                                   {
           							date: "12/02/2000",
           							service: 'tratament',
           							pictures: 4,
           							movies: 6
                                   },
                                   {
          							date: "12/02/2000",
          							service: 'tratament',
          							pictures: 4,
          							movies: 6
                                  },
                                  {
          							date: "12/02/2000",
          							service: 'tratament',
          							pictures: 4,
          							movies: 6
                                  }];
    }

    ClientHistoryController.$inject = [];
})();