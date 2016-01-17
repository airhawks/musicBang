(function() {
    'use strict';

  angular
    .module('musicBang')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];

    function configFunction($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider.
            state('trackList', {
              url: '/',
              templateUrl: 'components/trackList/trackList.html',
              controller: 'TrackListController',
              controllerAs: 'vm'
            }).
            state('genreList', {
              url: '/genres',
              templateUrl: 'components/genreList/genreList.html',
              controller: 'GenreListController',
              controllerAs: 'vm'
            });

          $urlRouterProvider.otherwise("/");
    }
})();
