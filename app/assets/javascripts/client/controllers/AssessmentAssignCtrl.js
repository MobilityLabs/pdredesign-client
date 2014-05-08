PDRClient.controller('AssessmentAssignCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {


      $scope.id = $stateParams.id;
      $scope.assessment = Assessment.get({id: $scope.id});
      $scope.participants = Participant.query({assessment_id: $scope.id})
      $scope.nonDistrictParticipants = Participant.all({assessment_id: $scope.id})

      function updateAssessmentList () {
        Participant.query({assessment_id: $scope.id}).$promise.then(function(data){

        $timeout(function() {
          $scope.participants = data
        }, 2900);


        }, function(){
          console.log("error")
        }
      );

        Participant.all({assessment_id: $scope.id}).$promise.then(function(data){

            $timeout(function() {
              $scope.nonDistrictParticipants = data;
            }, 2900);
        });
      }

      $scope.removeParticipant = function(user){

        Participant.delete({assessment_id: $scope.id, id: user.participant_id}, {user_id: user.id})
          user.hide = "yes";
          updateAssessmentList();

      }

      $scope.addParticipant = function(user){
        Participant.save({assessment_id: $scope.id}, {user_id: user.id})
        user.hide = "yes";
        updateAssessmentList();
      }

    }
]);
