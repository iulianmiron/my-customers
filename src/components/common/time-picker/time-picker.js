(function() {
    'use strict';

    angular
        .module('cm.components.common.timePicker', [])
        .component('timePicker', {
            templateUrl: '/components/common/time-picker/time-picker.html',
            controller: TimePickerController,
            bindings: {
                type: '@',
                placeholder: '@',
                startTime: '<',
                selectedTime: '<',
                onUpdate: '&'
            }
        });

        TimePickerController.$inject = [];
        function TimePickerController() {
            var ctrl = this;
            ctrl.data = {};
            ctrl.status = {};
            ctrl.actions = {};
    
            ctrl.$onChanges = function(changes) {
                if(changes.selectedTime && changes.selectedTime.currentValue) {
                    ctrl.data.selectedTime = angular.copy(changes.selectedTime.currentValue);
                    ctrl.data.initialDate = angular.copy(changes.selectedTime.currentValue);
                    ctrl.data.selectedTime = processTime(ctrl.data.selectedTime);
                }
                if(changes.startTime && changes.startTime.currentValue) {
                    ctrl.data.startTime = angular.copy(changes.startTime.currentValue);
                }
            }
            ctrl.$onInit = function() {
                ctrl.data.startHour = 8;
                ctrl.data.endHour = 22;
                
                ctrl.actions.generateTimeList = generateTimeList;
                ctrl.actions.updateTime = updateTime;
                ctrl.actions.blur = blur;
                ctrl.actions.search = search;

                ctrl.data.times = generateTimeList(ctrl.data.startHour, ctrl.data.endHour);
                
            }

            function processTime(time) {
                var hour = moment(time).hour();
                var minute = moment(time).minutes();

                if(minute < 10) { minute = '0' + minute; }
                if(hour < 10) { hour = '0' + hour; }

                return hour + ':' + minute;
            }

            function nearestMinutes(interval, someMoment){
                var roundedMinutes = Math.round(someMoment.clone().minute() / interval) * interval;
                return someMoment.clone().minute(roundedMinutes).second(0);
            }
        
            function generateTimeList(startHour, endHour) {
                var startHour = startHour || 0;
                var endHour = endHour || 24;
                var times = [];

                for(var i = startHour; i <= endHour; i++) {
                    var hour = i;

                    hour = (i < 10) ? '0' + hour.toString() : hour.toString();

                    if(i === endHour) {
                        times.push(hour + ':00');
                    } else {
                        times.push(hour + ':00', hour + ':15', hour + ':30', hour + ':45');
                    }
                }
                return times;
            }

            function search(query) {
                return ctrl.data.times.filter(function(time) { return time.startsWith(query); });
            }

            function blur(query) {
                if(query) {
                    ctrl.data.selectedTime = ctrl.data.times.filter(function(time) {
                        return time === query;
                    })[0];
                }
                if(!ctrl.data.selectedTime) {
                    ctrl.data.selectedTime = processTime(ctrl.data.initialDate);
                }
            }

            function updateTime(selectedTime) {
                if(selectedTime && !selectedTime.split(':').length){
                    selectedTime = processTime(selectedTime);
                }
                if(selectedTime) {
                    var hour = selectedTime.split(':')[0];
                    var minute = selectedTime.split(':')[1];
    
                    var time = new Date(moment(ctrl.data.initialDate).hour(hour).minute(minute).second(0));

                    ctrl.onUpdate({$event: {time: time, type: ctrl.type}});
                }
            }

        }

})();


