(function() {
    'use strict';

  angular
    .module('musicBang')
    .factory('backendService', backendService);

    backendService.$inject = ['$http','$q','loaderService','$timeout'];

    function backendService($http, $q, loaderService, $timeout) {
        
        var serviceUrl = 'http://130.211.113.98:8000/v1/';
        
        function getAllTracks(url){
            loaderService.showLoader();
            var request;
            if(!url){
                request = {
                    method: 'GET',
                    url: serviceUrl + 'tracks'
                };
            }else{
                request = {
                    method: 'GET',
                    url: url
                };
            }
            
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        function getAllGenres(url){
            loaderService.showLoader();
            var request;
            if(!url){
                request = {
                    method: 'GET',
                    url: serviceUrl + 'genres',
                };
            }else{
                request = {
                    method: 'GET',
                    url: url
                };
            }
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        function addTrack(track){
            loaderService.showLoader();
            var request = {
                method: 'POST',
                url: serviceUrl + 'tracks',
                data: track
            };
            
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        function editTrack(track){
            loaderService.showLoader();
            var request = {
                method: 'POST',
                url: serviceUrl + 'tracks/' + track.id,
                data: track
            };
            
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        function addGenre(genre){
            loaderService.showLoader();
            var request = {
                method: 'POST',
                url: serviceUrl + 'genres',
                data: { name: genre.name }
            };
            
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        function editGenre(genre){
            loaderService.showLoader();
            var request = {
                method: 'POST',
                url: serviceUrl + 'genres/' + genre.id,
                data: { name: genre.name }
            };
            
            return $http(request)
                .then(function(response) {
                        loaderService.hideLoader();
                        return response;
                    }, function(response) {
                        loaderService.hideLoader();
                        return $q.reject(response);
                    });
        }
        
        return {
            getAllTracks: getAllTracks,
            getAllGenres: getAllGenres,
            addTrack: addTrack,
            editTrack: editTrack,
            addGenre: addGenre,
            editGenre: editGenre
        };
        
    }
})();
