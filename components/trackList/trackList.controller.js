(function() {
    'use strict';

  angular
    .module('musicBang')
    .controller('TrackListController', TrackListController);

    TrackListController.$inject = ['backendService','$state','$mdDialog','loaderService'];

    function TrackListController(backendService, $state, $mdDialog, loaderService) {
        var vm = this;
        
        vm.loader = loaderService.getLoader();
        vm.tracks = [];
        vm.seachTrack = '';
        vm.onClickTrack = onClickTrack;
        vm.onClickGenreList = onClickGenreList;
        vm.onClickNewTrack = onClickNewTrack;
        vm.backPage = false;
        vm.nextPage = false;
        vm.onClickBackPage = onClickBackPage;
        vm.onClickNextPage = onClickNextPage;
        
        activate();
        
        function activate(){
            getAllTracks();
        }
        
        function getAllTracks(){
            backendService.getAllTracks()
                .then(function(response){
                    var data = response.data;
                    vm.tracks = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
        function onClickTrack(track){
            showTrackDialog(track);
        }
        function onClickNewTrack(){
            var track = {};
            showTrackDialog(track);
        }
        function showTrackDialog(track){
            $mdDialog.show({
                    controller: 'TrackController',
                    templateUrl: 'components/track/track.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    locals: {
                        trackToEdit: track
                    },
                    clickOutsideToClose: false,
                    controllerAs: 'vm',
                    bindToController: true,
                    fullscreen: false
                })
                .then(function(answer) {
                    getAllTracks();
                }, function() {
                    
                });}
        function onClickGenreList(){
            $state.go('genreList');
        }
        function onClickBackPage(){
            backendService.getAllTracks(vm.backPage)
                .then(function(response){
                    var data = response.data;
                    vm.tracks = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
        function onClickNextPage(){
            backendService.getAllTracks(vm.nextPage)
                .then(function(response){
                    var data = response.data;
                    vm.tracks = data.results;
                    vm.nextPage = data.next;
                    vm.backPage = data.previous;
                }).catch(function(){
                    
                }).finally();
        }
    }
})();
