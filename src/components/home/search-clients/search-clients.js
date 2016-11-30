(function(){
	'use strict';

	angular
		.module('cm.components.home.searchClients', [])
		.component('searchClients', {
			templateUrl: '/components/home/search-clients/search-clients.html',
			controller: SearchClientsController,
			bindings: {}
		});

		function SearchClientsController ($timeout, $q, $log) {
		    var ctrl = this;

		    ctrl.data = {};
		    ctrl.status = {};
		    ctrl.actions = {};

		    ctrl.simulateQuery = false;
		    ctrl.isDisabled    = false;

		    // list of `state` value/display objects
		    ctrl.states        = loadAll();
		    ctrl.querySearch   = querySearch;
		    ctrl.selectedResultChange = selectedResultChange;
		    ctrl.searchTextChange   = searchTextChange;

		    ctrl.actions.newClient = newClient;

		    function newClient(state) {
		      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
		    }

		    // ******************************
		    // Internal methods
		    // ******************************

		    /**
		     * Search for states... use $timeout to simulate
		     * remote dataservice call.
		     */
		    function querySearch (query) {
		      var results = query ? ctrl.states.filter( createFilterFor(query) ) : ctrl.states,
		          deferred;
		      if (ctrl.simulateQuery) {
		        deferred = $q.defer();
		        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
		        return deferred.promise;
		      } else {
		        return results;
		      }
		    }

		    function searchTextChange(text) {
		      $log.info('Text changed to ' + text);
		    }

		    function selectedResultChange(item) {
		      $log.info('Item changed to ' + JSON.stringify(item));
		    }

		    /**
		     * Build `states` list of key/value pairs
		     */
		    function loadAll() {
		      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
		              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
		              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
		              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
		              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
		              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
		              Wisconsin, Wyoming';

		      return allStates.split(/, +/g).map( function (state) {
		        return {
		          value: state.toLowerCase(),
		          display: state
		        };
		      });
		    }

		    /**
		     * Create filter function for a query string
		     */
		    function createFilterFor(query) {
		      var lowercaseQuery = angular.lowercase(query);

		      return function filterFn(state) {
		        return (state.value.indexOf(lowercaseQuery) === 0);
		      };

		    }
		  }

		SearchClientsController.$inject = ['$timeout', '$q', '$log'];
})();


