(function() {
    'use strict';

    angular
        .module('cm.components.common.starRating', [])
        .component('starRating', {
            templateUrl: '/components/common/star-rating/star-rating.html',
            controller: StarRatingController,
            bindings: {
                rating: '<',
                halfIncrement: '<',
                clearButton: '<',
                maxRating: '@',
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
            if(changes.rating && changes.rating.currentValue) {
                ctrl.data.initialRating = angular.copy(changes.rating.currentValue);
            }
            if(changes.maxRating && changes.maxRating.currentValue) {
                ctrl.data.starsCount = angular.copy(changes.maxRating.currentValue);
            }
            if(changes.halfIncrement && changes.halfIncrement.currentValue) {
                ctrl.data.halfStars = angular.copy(changes.halfIncrement.currentValue);
            }
            if(changes.clearButton && changes.clearButton.currentValue) {
                ctrl.data.clearButton = angular.copy(changes.clearButton.currentValue);
            }
        };

        ctrl.$onInit = function () {
            var stars = parseInt(ctrl.data.starsCount) || 5;
            ctrl.data.stars = generateStars(stars);
            ctrl.data.stars = updateIcons(ctrl.data.initialRating, ctrl.data.stars);
            ctrl.data.selectedRating = ctrl.data.initialRating || 0;
            ctrl.data.halfStars = !!ctrl.data.halfStars;
            ctrl.data.clearButton = typeof ctrl.data.clearButton;

            ctrl.actions.selectRating = selectRating;
            ctrl.actions.getMouseHoverPos = getMouseHoverPos;
            ctrl.actions.resetIcons = resetIcons;
            ctrl.actions.isMousePosOverHalf = isMousePosOverHalf;
            ctrl.actions.clearRating = clearRating;
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

        function updateIcons(rating, stars) {
            return stars.map(function(star) {
                if(star.id <= rating) { star.icon = 'star'; }
                if(star.id > rating) { star.icon = 'star_border'; }
                if(rating >= star.id - 0.5 && rating < star.id) { star.icon = 'star_half'; }

                return star;
            });
        }

        function selectRating(event, id) {
            ctrl.data.selectedRating = getRatingValue(event, id);
            ctrl.data.stars = updateIcons(ctrl.data.selectedRating, ctrl.data.stars);

            ctrl.onChange({$event: {selectedRating: ctrl.data.selectedRating}});
        }

        function getMouseHoverPos(event, id) {
            ctrl.data.hoveredRating = getRatingValue(event, id);
            ctrl.data.stars = updateIcons(ctrl.data.hoveredRating, ctrl.data.stars);
        }

        function resetIcons() {
            ctrl.data.stars = updateIcons(ctrl.data.selectedRating, ctrl.data.stars);
        }

        function getRatingValue(event, id) {
            var ratingValue;
            if(event) {
                var overHalf = !ctrl.data.halfStars || isMousePosOverHalf(event);
                ratingValue = id - (overHalf ? 0 : 0.5);
            }
            return ratingValue || id;
        }

        function isMousePosOverHalf(event) {
            return event.offsetX >= (event.target.clientWidth / 2);
        }

        function clearRating() {
            ctrl.data.selectedRating = null;
            ctrl.data.stars = updateIcons(ctrl.data.selectedRating, ctrl.data.stars);
            ctrl.onChange({$event: {selectedRating: ctrl.data.selectedRating}});
        }
    }

})();