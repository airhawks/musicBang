(function() {
    'use strict';

  angular
    .module('musicBang')
    .directive('starRating', directiveFunction);

    directiveFunction.$inject = ['$http'];

    function directiveFunction($http) {
        
        function link(scope, elem, attrs) {
            var updateStars = function() {
                scope.stars = [];
                for ( var i = 0; i < scope.max; i++) {
                    if(i+1 <= scope.ratingValue){
                        scope.stars.push({
                            filled : true,
                            partial: false
                        });
                    }
                    else if(i < scope.ratingValue){
                        scope.stars.push({
                            filled: false,
                            partial : true
                        });    
                    }
                    else{
                        scope.stars.push({
                            filled: false,
                            partial : false
                        });
                    }
                }
            };

            scope.toggle = function(index) {
                if(scope.onRatingSelected){
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating : index + 1
                    });
                }
            };

            scope.$watch('ratingValue',
                function(newVal, oldVal) {
                    if (newVal || (newVal == 0)) {
                        if(newVal < 0) scope.ratingValue = 0;
                        if(newVal > 5) scope.ratingValue = 5;
                        updateStars();
                    }
                }
            );
        }
        
        return {
			restrict : 'EA',
			templateUrl : 'directives/starRating/starRating.html',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&?'
			},
			link : link
        }
    }
})();
