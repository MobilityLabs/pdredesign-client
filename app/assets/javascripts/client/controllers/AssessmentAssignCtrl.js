PDRClient.controller('AssessmentAssignCtrl', [
  '$scope', 
  '$timeout', 
  '$anchorScroll',
  'SessionService', 
  'Assessment', 
  '$stateParams', 
  'Participant',
  'Rubric',
    function($scope, $timeout, $anchorScroll, SessionService, Assessment, $stateParams, Participant, Rubric) {

      $scope.id = $stateParams.id;
      $scope.assessment = Assessment.get({id: $scope.id});
      $scope.participants = Participant.query({assessment_id: $scope.id})
      $scope.nonDistrictParticipants = Participant.all({assessment_id: $scope.id})
      $scope.rubrics  = Rubric.query();

      $scope.alerts = [];

      window.assessment = $scope.assessment

      $scope.save = function(assessment) {
        $scope.saving = true;
        Assessment
          .save({ id: assessment.id }, assessment)
          .$promise
          .then(function(_data) {
            $scope.saving = false;
            $scope.success('Assessment Saved!');
          });
      }

      $scope.success = function(message) {
        $scope.alerts.push({type: 'success', msg: message });
        $anchorScroll();
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      function updateAssessmentList () {
        Participant
          .query({assessment_id: $scope.id})
          .$promise
          .then(function(data){
            $timeout(function() {
              $scope.participants = data
            }, 2900);
          }, function(){
            console.log("error")
          });

        Participant.all({assessment_id: $scope.id}).$promise.then(function(data) {
            $timeout(function() {
              $scope.nonDistrictParticipants = data;
            }, 2900);
        });
      }

      $scope.removeParticipant = function(user) {
        Participant.delete({assessment_id: $scope.id, id: user.participant_id}, {user_id: user.id})
        user.hide = "yes";
        updateAssessmentList();
      }

      $scope.addParticipant = function(user) {
        Participant.save({assessment_id: $scope.id}, {user_id: user.id})
        user.hide = "yes";
        updateAssessmentList();
      }

      $scope.formattedDate = function(date) {
        return moment(date).format("Do MMM YYYY");
      }


    }
]);
