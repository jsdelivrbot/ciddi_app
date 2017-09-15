angular.module('ciddi.controllers')
.controller('FavoritesCtrl', function($scope, $window, UserService) {
	console.log("Favorites ctrl")
	$scope.favorites = UserService.favorites 
	$scope.username = UserService.username
    $scope.removePerson = function(person, index) {
    	UserService.removePersonFromFavorites(person, index);
    }
    $scope.openPerson = function(person) {
    	
  	}
})
