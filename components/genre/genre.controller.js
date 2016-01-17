(function() {
    'use strict';

  angular
    .module('musicBang')
    .controller('GenreController', GenreController);

    GenreController.$inject = ['backendService','$mdDialog','$mdToast'];

    function GenreController(backendService, $mdDialog, $mdToast) {
        var vm = this;

        var position = 'bottom';
        vm.genre = angular.copy(vm.genreToEdit);
        vm.onClickOk = onClickOk;
        vm.onClickCancel = onClickCancel;
        
        activate();
        
        function activate(){
            if(vm.genre.id){
                vm.title = "Edit Genre";
            }
            else{
                vm.title = "New Genre";
            }
        }
        
        function onClickOk(){
            if(vm.genre.id){
                backendService.editGenre(vm.genre)
                    .then(function(){
                        $mdDialog.hide(vm.genre);
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
            }else{
                backendService.addGenre(vm.genre)
                    .then(function(){
                        $mdDialog.hide(vm.genre);
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
        function onClickCancel(){
            $mdDialog.cancel();
        }
    }
})();
