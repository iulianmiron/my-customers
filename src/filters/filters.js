(function() {
    'use strict'

    angular
        .module('cm.filters', [])
        .filter('isRoomType', function () {
            return function(list, type1, type2) {
                var selectedRooms = [];

                angular.forEach(list, function(listItem) {
                    if(listItem.type === type1 || listItem.type === type2) {
                        selectedRooms.push(listItem);
                    }
                });
                return selectedRooms;
            }
        });
})();