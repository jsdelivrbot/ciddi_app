angular.module('ciddi.controllers')

.controller('StepsCtrl', ['$state', 'irkResults','$scope','$ionicModal', 'user',
  function($state, irkResults, $scope, $ionicModal, user) {
  $scope.data = {};
  console.log("StepsCtrl")

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('templates/modal-steps.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.openModal()

  $scope.getResults = function() {
    var results = irkResults.getResults();
    console.log("results:", results)
    var ResearchResults =  Parse.Object.extend("ResearchResults")
    var researchResults =  new ResearchResults()
    
    researchResults.set("start", results["start"])
    researchResults.set("end", results["end"])  
    researchResults.set("childResults", results["childResults"])
    researchResults.set("canceled", results["canceled"])
    researchResults.set("user", user)

    researchResults.save(null, {
      success: function(researchResults) {
        // Execute any logic that should take place after the object is saved.
        console.log('New object created with objectId: ' + researchResults.id)
      },
      error: function(researchResults, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        console.log('Failed to create new object, with error code: ' + error.message)
      }
    })

    $state.go('app.tab.discover')
  }

  $scope.closeModal = function() {
    $scope.modal.remove();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
}])


