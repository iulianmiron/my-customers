(function() {
    'use strict';

    angular
        .module('cm.components.common.starRating', [])
        .component('starRating', {
            templateUrl: '/components/common/star-rating/star-rating.html',
            controller: StarRatingController,
            bindings: {
                stars: '@',
                halfStars: '<',
                onChange: '&'
            }
        });

    StarRatingController.$inject = [];
    function StarRatingController() {
        var ctrl = this;
        ctrl.data = {};
        ctrl.status = {};
        ctrl.actions = {};

        ctrl.$onChanges = function(changes) {
            if(changes.stars && changes.stars.currentValue) {
                ctrl.data.starsCount = angular.copy(changes.stars.currentValue);
            }
            if(changes.halfStars && changes.halfStars.currentValue) {
                ctrl.data.halfStars = angular.copy(changes.halfStars.currentValue);
            }
        };

        ctrl.$onInit = function () {
            
            var stars = parseInt(ctrl.data.starsCount) || 5;
            ctrl.data.stars = generateStars(stars);
            ctrl.data.selectedStarId = 0;

            ctrl.actions.selectRating = selectRating;
            ctrl.actions.hoverIcon = hoverIcon;
            ctrl.actions.resetIcons = resetIcons;
            ctrl.data.isMousePosOverHalf = isMousePosOverHalf;
        }

        function generateStars(value) {
            var ratingsArray = [];

            for(var i = 1; i <= value; i++) {
                var rating = {
                    id: i,
                    icon: 'star_border'
                }
                ratingsArray.push(rating);
            }

            return ratingsArray;
        }

        function selectRating(id) {
            ctrl.data.selectedStarId = id;
            ctrl.data.stars = updateIcons(id, ctrl.data.stars);

            ctrl.onChange({$event: {selectedRating: id}});
        }

        function updateIcons(id, stars) {
            for(var i = 0; i < stars.length; i++) {
                var star = stars[i];
                if(star.id <= id) {
                    star.icon = 'star'
                }
                if(star.id > id) {
                    star.icon = 'star_border';
                }
                if(id === star.id - 0.5) {
                    star.icon = 'star_half';
                }
            }

            return stars;
        }

        function hoverIcon(event, id) {
            var lessThanHalf = isMousePosOverHalf(event);
            ctrl.data.hoverValue = id - (lessThanHalf ? 0.5 : 0);
            ctrl.data.stars = updateIcons(ctrl.data.hoverValue, ctrl.data.stars);
        }

        function resetIcons() {
            ctrl.data.stars = updateIcons(ctrl.data.hoverValue, ctrl.data.stars);
        }

        function isMousePosOverHalf(event) {
            return ctrl.data.halfStars ? event.offsetX < (event.target.clientWidth / 2) : false;
        }
    }

})();