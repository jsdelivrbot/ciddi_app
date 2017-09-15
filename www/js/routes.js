angular.module('ciddi.routes', ['ciddi.services'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('splash', {
    url: '/',
    templateUrl: 'templates/splash.html',
    controller: 'SessionCtrl',
    onEnter: function($state){
      
    }
  })

  .state('steps', {
    url: '/steps',
    controller: 'StepsCtrl',
    resolve: {
      user: function (SessionService) {
        var value = SessionService.init();
        return value;
      }
    }
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.matches', {
      url: '/matches',
      views: {
        'menuContent': {
          templateUrl: 'templates/matches.html'
        }
      }
    })
   .state('app.contacts', {
      url: '/contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/contacts.html'
        }
      }
    })
   .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })
  .state('app.tab', {
    url: '/tab',
     views: {
      'menuContent': {
        templateUrl: 'templates/tabs.html',
    	  controller: 'TabsCtrl',
  	    resolve: {
           user: function (SessionService) {
              var value = SessionService.init();
              return value;
           }
       }
      }
    }
  })

  .state('app.tab.discover', {
    url: '/discover',
    views: {
      'tab-discover': {
        templateUrl: 'templates/discover.html',
        controller: 'DiscoverCtrl'
      }
    }
  })

  .state('app.tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'templates/favorites.html',
          controller: 'FavoritesCtrl'
        }
      }
  })
  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('/');

})
