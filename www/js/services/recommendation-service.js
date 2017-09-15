angular.module('ciddi.services')
.factory('Recommendations',function($http, $q){
	var media;
	var o = {queue:[]}
	o.init = function() {
	    if (o.queue.length === 0) {
	      // if there's nothing in the queue, fill it.
	      // this also means that this is the first call of init.
	      return o.getNextPersons();

	    }
    }
	o.getNextPersons = function(){
		return $http({method:'GET',url:'http://localhost:1337/recommendations'})
		.success(function(data){
			o.queue = o.queue.concat(data)
		})
	}
	o.nextPerson = function() {
	    // pop the index 0 off
	    o.queue.shift();
		// low on the queue? lets fill it up
	    if (o.queue.length <= 3) {
	      o.getNextPersons();
     	}
   }
  
  return o
})