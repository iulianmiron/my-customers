(function() {
    'use strict';

    angular
        .module('cm.components.calendar', [])
        .component('calendar', {
            templateUrl: '/components/calendar/calendar.html',
            controller: CalendarController,
            bindings: {}
        });

    function CalendarController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onInit = function() {
        };
    }

    CalendarController.$inject = [];
})();