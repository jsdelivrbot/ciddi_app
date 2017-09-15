angular.module('ciddi.controllers')
.controller('SessionCtrl',['$state','$scope',
	'SessionService','$ionicPopup','$ionicLoading',
	'$cordovaFacebook','FacebookService', '$ionicModal', 
	function($state, $scope, SessionService, $ionicPopup, 
	$ionicLoading, $cordovaFacebook, FacebookService, $ionicModal) {
       
       $scope.signUpData = {}

        //
        $scope.signUpWithEmail = function(){
       		console.log("signUpWithEmail")
	        SessionService.init();
	        SessionService.createUser($scope.signUpData).then(function (_data) {
	            $scope.user = _data;
				console.log("Success Creating User Account ");
			    $state.go('app.tab.discover')
			}, 
	        function (_error) {
	        	$ionicPopup.alert({
						title: 'SignUp Error',
						template: _error.message
				 });
	        	console.log("Error Creating User Account " + _error.debug)
	         });
		}

		//
	    $scope.signInWithEmail = function(){
	      console.log("signInWithEmail")
	      $scope.loginData = {}
	      SessionService.init();
	      SessionService
	         .login($scope.loginData.username, $scope.loginData.password)
	         .then(function (_response) {
				 console.log("login success " + _response.attributes.username);
				 $state.go('app.tab.discover')
			  }, function (_error) {
			  	$ionicPopup.alert({ title: 'SignIn Error',
				 	template: _error.message
				});	
	            console.log("error logging in " + _error.message);
	         })
		}

		//
		$scope.loginWithFB = function(){
			console.log("signInWithFB")
			var appID = "1024061254338888";
			$cordovaFacebook.login(["public_profile", "email", "user_friends"])
			.then(function(success){
                console.log("success", success)
			    console.log(success.authResponse)
			    //	
                FacebookService.getFacebookProfileInfo(success.authResponse)
                .then(function(profileInfo) {
                	console.log("getFacebookProfileInfo")
                    
                	//Need to convert expiresIn format from FB to date
			    	var expiration_date = new Date();
			    	expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
			    	expiration_date = expiration_date.toISOString();

                	var facebookAuthData = {
					  "id": profileInfo.id,
					  "access_token": success.authResponse.accessToken,
					  "expiration_date": expiration_date,
					}
					console.log(facebookAuthData)
					
                	//Write to parse
                	SessionService.init()
              		SessionService.loginWithFB(facebookAuthData)
				    .then(function(user) {
	                    console.log(user);

	                    if (!user.existed()) {
	                      console.log("User signed up and logged in through Facebook!");
	                    } else {
	                      console.log("User logged in through Facebook!");
	                    }

	                    user.set("name", profileInfo.name)
	                    user.set("email", profileInfo.email)
	                    user.set("picture", "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large")
	                    user.save()
						$state.go("steps")
                      },
	                  function(user, _error) {
	                    console.log("User cancelled the Facebook login or did not fully authorize.");
	                    $ionicPopup.alert({ title: 'FBP Login Error',
	                    	template: _error.message
	                    }); 
	                  }
	                )


				}, function(fail){
                	// Fail get profile info
                	console.log('profile info fail', fail);
                });



			}, function(_error){
			    console.log(error);
			    $ionicPopup.alert({ title: 'Login Error',
				 	template: _error.message
			    });
			});
		}

	}
])
