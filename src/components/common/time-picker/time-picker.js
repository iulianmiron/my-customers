(function() {
    'use strict';

    angular
        .module('cm.components.common.timePicker', [])
        .component('timePicker', {
            templateUrl: '/components/common/time-picker/time-picker.html',
            controller: TimePickerController,
            bindings: {
                placeholder: '@',
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
                    ctrl.data.time = angular.copy(changes.selectedTime.currentValue);
                    ctrl.data.initialDate = angular.copy(changes.selectedTime.currentValue);
                }
            }
            ctrl.$onInit = function() {
                
                ctrl.actions.generateTimeList = generateTimeList;
                ctrl.actions.updateTime = updateTime;
                ctrl.actions.blur = blur;
                ctrl.actions.searchTime = searchTime;

                ctrl.data.times = generateTimeList(8, 22);
                ctrl.data.time = processTime(ctrl.data.time);
            }

            function processTime(selectedTime) {
                var hour = moment(selectedTime).hour();
                var minute = moment(selectedTime).minute();
                return hour + ':' + minute;
            }
        
            function generateTimeList(startHour, endHour) {
                var startHour = startHour || 0;
                var endHour = endHour || 24;
                var times = [];

                for(var i = startHour; i < endHour; i++) {
                    var hour = i;

                    hour = (i < 10) ? '0' + hour.toString() : hour.toString();
                    times.push(hour + ':00', hour + ':15', hour + ':30', hour + ':45');
                }
                return times;
            }

            function searchTime(query) {
                return ctrl.data.times.filter(function(time) { return time.startsWith(query); });
            }

            function blur(query) {
                if(query) {
                    if(query.length === 1) {
                        query = '0' + query;
                    }
                    if(query.includes(':')) {
                        var hour = query.split(':')[0];
                        var minute = query.split(':')[1];
        
                        if(minute.length && minute.length === 1) {
                            if(minute.startsWith('1') || minute.startsWith('4')){
                                minute = minute + '5';
                            }
                            if(minute.startsWith('0') || minute.startsWith('3')) {
                                minute = minute + '0';
                            }
                        } else {
                            minute = '00';
                        }
        
                        query = hour + ':' + minute;
                    } else {
                        query = query + ':00';
                    }
                    
                    ctrl.data.time = ctrl.data.times.filter(function(time) {
                        return time === query;
                    })[0];
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

                    ctrl.onUpdate({$event: {time: time}});
                }
            }

        }

})();


