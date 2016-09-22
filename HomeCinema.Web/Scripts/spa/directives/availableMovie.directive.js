(function (app) {
	'use strict';

	app.directive('availableMovie', availableMovie);

	function availableMovie() {
		return {
			restrict: 'E',
			templateUrl: "/Scripts/spa/directives/availableMovie.html",
			link: function ($scope, $element, $attrs) {
				$scope.getAvailableClass = function () {
					if ($attrs.isAvailable === 'true')
						return 'label label-success'
					else
						return 'label label-danger'
				};
				$scope.getAvailability = function () {
					if ($attrs.isAvailable === 'true')
						return 'Available!'
					else
						return 'Not Available'
				};
			}
		}
	}

})(angular.module('common.ui'));

(function(app) {
    'use strict';

    app.directive('componentRating', componentRating);

    function componentRating() {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $element.raty({
                    score: $attrs.componentRating,
                    halfShow: false,
                    readOnly: $scope.isReadOnly,
                    noRatedMsg: "Not rated yet!",
                    starHalf: "../Content/images/raty/star-half.png",
                    starOff: "../Content/images/raty/star-off.png",
                    starOn: "../Content/images/raty/star-on.png",
                    hints: ["Poor", "Average", "Good", "Very Good", "Excellent"],
                    click: function (score, event) {
                        //Set the model value
                        $scope.movie.Rating = score;
                        $scope.$apply();
                    }
                });
            }
        }
    }

})(angular.module('common.ui'));
