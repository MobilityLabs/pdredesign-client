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

      $scope.assignAndSave = function(assessment) {
        if (confirm("Are you sure you want to send out the assessment and invite all your participants?")) {
          $scope.save(assessment, true);
        }
      };

      $scope.save = function(assessment, assign) {
        $scope.saving = true;
        assessment.due_date = moment($("#due-date").val()).toISOString();

        if(assign) assessment.assign = true;

        Assessment
          .save({ id: assessment.id }, assessment)
          .$promise
          .then(function(_data) {
            $scope.saving = false;
            $scope.success('Assessment Saved!');
          }, function(){
            $scope.saving = false;
            $scope.error('Could not save assessment');
          });
      }

      $scope.success = function(message) {
        $scope.alerts.push({type: 'success', msg: message });
        $anchorScroll();
      };

      $scope.error   = function(message) {
        $scope.alerts.push({type: 'danger', msg: message });
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
          }, function() {
            $scope.error('Could not update participants list');
          });

        Participant.all({assessment_id: $scope.id}).$promise.then(function(data) {
            $timeout(function() {
              $scope.nonDistrictParticipants = data;
            }, 2900);
        }, function() {
            $scope.error('Could not update participants list');
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

      $timeout(function() {
        $scope.datetime = $('.datetime').datetimepicker({
          minuteStepping:15,
          useSeconds: false,
          icons: { time: "fa fa-clock-o", date: "fa fa-calendar",
            up: "fa fa-arrow-up", down: "fa fa-arrow-down" }
        });
      });

    }
]);
