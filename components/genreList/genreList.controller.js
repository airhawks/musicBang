(function() {
    'use strict';

  angular
    .module('musicBang')
    .controller('GenreListController', GenreListController);

    GenreListController.$inject = ['backendService','$state','$mdDialog','loaderService'];

    function GenreListController(backendService, $state, $mdDialog, loaderService) {
      var vm = this;

        vm.loader = loaderService.getLoader();
        vm.genres = [];
        vm.onClickGenre = onClickGenre;
        vm.onClickListTracks = onClickListTracks;
        vm.onClickNewGenre = onClickNewGenre;
        vm.backPage = false;
        vm.nextPage = false;
        vm.onClickBackPage = onClickBackPage;
        vm.onClickNextPage = onClickNextPage;
        
        activate();
        
        function activate(){
            getAllGenres();
        }
        
        function getAllGenres(){
            backendService.getAllGenres()
                .then(function(response){
                    var data = response.data;
                    vm.genres = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
        function onClickGenre(genre){
            showGenreDialog(genre);
        }
        function onClickNewGenre(){
            var genre = {};
            showGenreDialog(genre);
        }
        function showGenreDialog(genre){
            $mdDialog.show({
                    controller: 'GenreController',
                    templateUrl: 'components/genre/genre.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    locals: {
                        genreToEdit: genre
                    },
                    clickOutsideToClose: false,
                    controllerAs: 'vm',
                    bindToController: true,
                    fullscreen: false
                })
                .then(function(answer) {
                    getAllGenres();
                }, function() {
                    
                });
        }
        function onClickListTracks(){
            $state.go('trackList');
        }
        function onClickBackPage(){
            backendService.getAllGenres(vm.backPage)
                .then(function(response){
                    var data = response.data;
                    vm.genres = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
        function onClickNextPage(){
            backendService.getAllGenres(vm.nextPage)
                .then(function(response){
                    var data = response.data;
                    vm.genres = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
    }
})();
