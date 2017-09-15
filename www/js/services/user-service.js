angular.module('ciddi.services')

.factory('UserService',function($http, $q, $localStorage){
	var o = {
		favorites:[],
		newFavorites: 0,
		session_id: false,
		username: false
	}

	// attempt login or signup
	o.auth = function(username, signingUp) {
		var authRoute;

	    if (signingUp) {
	      authRoute = 'signup';
	    } else {
	      authRoute = 'login'
	    }

    	return $http.post(SERVER.url + '/' + authRoute, {username: username})
    	.success(function(data){
        	o.setSession(data.username, data.session_id, data.favorites);
      	});
	}

	 // set session data
	o.setSession = function(username, session_id, favorites) {
	    if (username) o.username = username;
	    if (session_id) o.session_id = session_id;
	    if (favorites) o.favorites = favorites;

	    // set data in localstorage object
	    $localstorage.setObject('user', { username: username, session_id: session_id });
	}

	// check if there's a user session present
	o.checkSession = function() {
	    var defer = $q.defer();

	    if (o.session_id) {
	      // if this session is already initialized in the service
	      defer.resolve(true);

	    } else {
	      // detect if there's a session in localstorage from previous use.
	      // if it is, pull into our service
	      var user = $localstorage.getObject('user');

	      if (user.username) {
	        // if there's a user, lets grab their favorites from the server
	        o.setSession(user.username, user.session_id);
	        o.populateFavorites().then(function() {
	          defer.resolve(true);
	        });

	      } else {
	        // no user info in localstorage, reject
	        defer.resolve(false);
	      }

	    }

	    return defer.promise;
	 }

	// wipe out our session data
	o.destroySession = function() {
	    $localstorage.setObject('user', {});
	    o.username = false;
	    o.session_id = false;
	    o.favorites = [];
	    o.newFavorites = 0;
	}

	o.addPersonToFavorites = function (person) {
		// make sure there's a song to add
	    if (!person) return false;

	    // add to favorites array
	    o.favorites.unshift(person);
	    o.newFavorites++;
	    // persist this to the server
    	// return $http.post(SERVER.url + '/favorites', 
    	// 	{session_id: o.session_id, song_id:person.id });
	}
	o.removePersonFromFavorites = function(person, index) {
    	// make sure there's a song to add
    	if (!person) return false;

    	// add to favorites array
    	o.favorites.splice(index, 1);

    	// persist this to the server
	    // return $http({
	    //   method: 'DELETE',
	    //   url: SERVER.url + '/favorites',
	    //   params: { session_id: o.session_id, song_id:person.id }
	    // });
  	}
  	o.favoriteCount = function() {
    	return o.newFavorites;
  	}

  	// gets the entire list of this user's favs from server
  	o.populateFavorites = function() {
	    return $http({
	      method: 'GET',
	      url: SERVER.url + '/favorites',
	      params: { session_id: o.session_id }
	    }).success(function(data){
	      // merge data into the queue
	      o.favorites = data;
	    });
  	}

	return o
})