(function() {
    'use strict';

  angular
    .module('musicBang')
    .directive('spinner', directiveFunction);

    directiveFunction.$inject = [];

    function directiveFunction() {
        
        function link(scope, elem, attrs) {
            
        }
        
        return {
			restrict : 'E',
			templateUrl : 'directives/spinner/spinner.html',
			scope : {
                
			},
			link : link
        }
    }
})();
