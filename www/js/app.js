// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ciddi', ['ionic', 'ciddi.controllers',
 'ciddi.services','ciddi.routes','ngCordova', 'ionicResearchKit'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //
    $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            //debugger;
            console.log('$stateChangeError ' + error && (error.debug || error.message || error));

            // if the error is "noUser" the go to login state
            if (error && error.error === "noUser") {
                event.preventDefault();

                $state.go('signin', {});
            }
    });
    
    //
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    Parse.serverURL = 'http://localhost:1337/parse'




  });
})

.value('ParseConfiguration', {
      applicationId: "ciddi",
      javascriptKey: "ciddi_js",

})
