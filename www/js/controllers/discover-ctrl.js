angular.module('ciddi.controllers')
.controller('DiscoverCtrl', function($scope, $ionicLoading, $timeout,
 UserService, Recommendations) {

   console.log("DiscoverCtrl")
   
   // helper functions for loading
  var showLoading = function() {
    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i>',
      noBackdrop: true
    });
  }

  var hideLoading = function() {
    $ionicLoading.hide();
  }

  // set loading to true first time while we retrieve songs from server.
  showLoading();

   // our first three songs
  Recommendations.init()
  .then(function(){
      hideLoading()
      $scope.currentPerson = Recommendations.queue[0];
      $scope.currentPerson.loaded = true;
    });
  
   $scope.sendFeedback = function(bool){
      if (bool) { UserService.addPersonToFavorites($scope.currentPerson)}
      $scope.currentPerson.rated = bool
      $scope.currentPerson.hide = true

      Recommendations.nextPerson();
      $scope.currentPerson = Recommendations.queue[0];
      $scope.currentPerson.loaded = true;
    }
    // used for retrieving the next album image.
    // if there isn't an album image available next, return empty string.
    $scope.nextAlbumImg = function() {
      if (Recommendations.queue.length > 1) {
          return Recommendations.queue[1].image_large;
      }

      return '';
    }

})
