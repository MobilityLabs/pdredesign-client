PDRClient.controller('AssessmentAssignCtrl', [
  '$scope',
  '$timeout',
  '$anchorScroll',
  '$location',
  '$stateParams',
  'SessionService',
  'Assessment',
  'Participant',
  'Rubric',
    function($scope, $timeout, $anchorScroll, $location, $stateParams, SessionService, Assessment, Participant, Rubric) {

      $scope.id                      = $stateParams.id;
      $scope.user                    = SessionService.getCurrentUser();
      $scope.participants            = Participant.query({assessment_id: $scope.id});
      $scope.allParticipants         = Participant.all({assessment_id: $scope.id});
      $scope.rubrics                 = Rubric.query();
      $scope.alerts                  = [];

      $scope.fetchAssessment = function() {
        return Assessment.get({id: $scope.id});
      };

      $scope.assessment = $scope.fetchAssessment();

      $scope.$watch('assessment.due_date', function(value) {
        $scope.due_date = moment(value).format("MM/DD/YYYY");
      });

      $scope.$on('update_participants', function() {
        updateParticipantsList();
      });

      $scope.messageError = "Enter a message before sending!";
      $scope.alertError   = false;

      $scope.assignAndSave = function(assessment) {
        if (assessment.message == null || assessment.message == '') {
          $scope.alertError = true;
          return;
        };

        if (confirm("Are you sure you want to send out the assessment and invite all your participants?")) {
          $scope.alertError = false;
          $scope.save(assessment, true);
          $location.path('/assessments');
        }
      };

      $scope.save = function(assessment, assign) {
        if(assessment.name == '') {
          $scope.error("Assessment needs a name!");
          return;
        };

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
      };

      $scope.success = function(message) {
        $scope.alerts.push({type: 'success', msg: message });
        $anchorScroll();
        $timeout(function() {
          $scope.alerts.splice(message, 1);
        }, 10000);
      };

      $scope.error   = function(message) {
        $scope.alerts.push({type: 'danger', msg: message });
        $anchorScroll();
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      function updateParticipantsList() {
        Participant
          .query({assessment_id: $scope.id})
          .$promise
          .then(function(data){
            $scope.participants = data
          }, function() {
            $scope.error('Could not update participants list');
          });

        Participant.all({assessment_id: $scope.id}).$promise.then(function(data) {
          $scope.allParticipants = data;
        }, function() {
            $scope.error('Could not update participants list');
        });
      };

      $scope.removeParticipant = function(user) {
        Participant.delete({assessment_id: $scope.id, id: user.participant_id}, {user_id: user.id})
        updateParticipantsList();
      };

      $scope.addParticipant = function(user) {
        Participant.save({assessment_id: $scope.id}, {user_id: user.id})
        updateParticipantsList();
      };

      $scope.formattedDate = function(date) {
        return moment(date).format("ll");
      };

      $timeout(function() {
        $scope.datetime = $('.datetime').datetimepicker({
          pickTime: false,
        });
      });

    }
]);
