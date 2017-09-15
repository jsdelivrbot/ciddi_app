angular.module('ciddi.controllers')
.controller('TabsCtrl', function($scope, $window, UserService, 
  Recommendations, user) {
  
  console.log("TabsCtrl")
  
  user.fetch().then(function(fetchedUser){
    var name = fetchedUser.getUsername();
    console.log("current user", name)
    }, function(error){
    //Handle the error
  })

  // expose the number of new favorites to the scope
  $scope.favCount = UserService.favoriteCount;
  // stop audio when going to favorites page
  $scope.enteringFavorites = function() {
    console.log("enteringFavorites")
    UserService.newFavorites = 0;
  }
  $scope.leavingFavorites = function() {
    console.log("leavingFavorites")
    Recommendations.init();
  }

  $scope.logout = function() {
    UserService.destroySession();

    // instead of using $state.go, we're going to redirect.
    // reason: we need to ensure views aren't cached.
    $window.location.href = 'index.html';
  }

})