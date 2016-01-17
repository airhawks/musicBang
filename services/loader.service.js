(function() {
    'use strict';

  angular
    .module('musicBang')
    .factory('loaderService', loaderService);

    loaderService.$inject = [];

    function loaderService() {
        var loader = {
            show: false
        }
        
        function getLoader(){
            return loader;
        }
        function hideLoader(){
            loader.show = false;
        }
        function showLoader(){
            loader.show = true;
        }
        
        return {
            getLoader: getLoader,
            hideLoader: hideLoader,
            showLoader: showLoader
        };
        
    }
})();
