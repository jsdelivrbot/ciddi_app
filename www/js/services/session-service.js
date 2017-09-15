angular.module('ciddi.services')

    .service('SessionService', ['$q', 'ParseConfiguration','$cordovaFacebook',
        function ($q, ParseConfiguration, $cordovaFacebook) {

            var parseInitialized = false;
            return {

                init: function () {
                    //debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize(ParseConfiguration.applicationId, 
                            ParseConfiguration.javascriptKey);
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                    user.set("email", _userParams.email);
                    user.set("health_point", 100)
                    
                    //user.set("first_name", _userParams.first_name);
                    //user.set("last_name", _userParams.last_name);

                    // should return a promise
                    return user.signUp(null, {});

                },
                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },

                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                loginWithFB:function(_facebookAuthData){
                    console.log("_facebookAuthData",_facebookAuthData)
                    var l = Parse.FacebookUtils.logIn(_facebookAuthData)
                    console.log(l)
                    return l
                },
                logout: function (_callback) {
                    var defered = $q.defer();
                    Parse.User.logOut();
                    defered.resolve();
                    return defered.promise;

                }

            }
}]);
