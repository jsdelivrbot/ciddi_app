angular.module('ciddi.services')
.service('FacebookService', ['$q', '$cordovaFacebook',
    function ($q, $cordovaFacebook) {
    return {
         // This method is to get the user profile info from the facebook api
         getFacebookProfileInfo: function (authResponse) {
            var info = $q.defer();
            console.log("getFacebookProfileInfo")
            facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
              function (response) {
                console.log(response);
                info.resolve(response);
              },
              function (response) {
                console.log("profile fail")
                console.log(response);
                info.reject(response);
              }
             );
            return info.promise;
        }
    }
}]);
