(function() {
    'use strict';

  angular
    .module('musicBang')
    .controller('TrackController', TrackController);

    TrackController.$inject = ['backendService','$mdDialog','$mdToast'];

    function TrackController(backendService, $mdDialog, $mdToast) {
        var vm = this;
        
        var position = 'bottom';
        vm.title;
        vm.track = angular.copy(vm.trackToEdit);
        vm.genres = [];
        vm.selectedGenres = [];
        vm.onClickOk = onClickOk;
        vm.onClickCancel = onClickCancel;
        vm.onRatingSelected = onRatingSelected;
        
        activate();
        
        function activate(){
            if(vm.track.genres){
                setSelectedGenres();
                vm.title = "Edit Track";
            }
            else{
                vm.title = "New Track";
                vm.track.rating = 5;
            }
            backendService.getAllGenres()
                .then(function(response){
                    var data = response.data;
                    vm.genres = data.results;
                })
                .catch()
                .finally();
            
        }
        
        function setSelectedGenres(){
            for(var i in vm.track.genres){
                vm.selectedGenres.push(vm.track.genres[i].id);
            }
        }
        function onClickOk(){
            vm.track.genres = [];
            for(var i in vm.selectedGenres){
                vm.track.genres.push(Number(vm.selectedGenres[i]));
            }
            vm.track.rating = Number(vm.track.rating);
            if(vm.track.id){
                backendService.editTrack(vm.track)
                    .then(function(){
                        $mdDialog.hide(vm.track);
                    })
                    .catch(function(){
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Server Error!')
                            .position(position)
                            .hideDelay(3000)
                        );
                    })
                    .finally();    
            }
            else{
                backendService.addTrack(vm.track)
                    .then(function(){
                        $mdDialog.hide(vm.track);
                    })
                    .catch(function(){
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent('Server Error!')
                            .position(position)
                            .hideDelay(3000)
                        );
                    })
                    .finally();
            }
        }
        function onRatingSelected(rating){
            vm.track.rating = rating;
        }
        function onClickCancel(){
            $mdDialog.cancel();
        }
    }
})();
