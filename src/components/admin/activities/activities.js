(function() {
	'use strict';

	angular
		.module('cm.components.admin.activities', [])
		.component('activities', {
			templateUrl: '/components/admin/activities/activities.html',
            controller: ActivitiesController,
            bindings: {}
		});

	function ActivitiesController(NO_PICTURE) {
		var ctrl = this;
		ctrl.data = {};
		ctrl.status = {};
		ctrl.actions = {};

		ctrl.$onInit = function() {
			ctrl.data.noPicture = NO_PICTURE;

			ctrl.actions.getAllActivities = getAllActivities;
            ctrl.actions.addActivity = addActivity;
            ctrl.actions.editActivity = editActivity;
            ctrl.actions.deleteActivity = deleteActivity;
            ctrl.actions.saveEditedActivity = saveEditedActivity;
           
            getAllActivities();			
		}

		function getAllConsumables() {
            ConsumablesServices.getAllConsumables().then(function(rConsumables) {
                ctrl.data.allConsumables = rConsumables;
            });
        }
	}

	ActivitiesController.$inject = ['NO_PICTURE'];

})();