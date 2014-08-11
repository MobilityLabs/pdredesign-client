PDRClient.controller('AssessmentDashboardCtrl', [
  '$modal',
  '$scope',
  '$timeout',
  '$stateParams',
  'SessionService',
  'Assessment',
  'Participant',
    function($modal, $scope, $timeout, $stateParams, SessionService, Assessment, Participant) {
      $scope.id = $stateParams.id;
      $scope.currentUser = SessionService.getCurrentUser();

      $scope.updateParticipantsList = function() {
        $scope.allParticipants = Participant.all({assessment_id: $scope.id})
      };

      $scope.updateAssessment = function() {
        Assessment
          .get({id: $scope.id})
          .$promise
          .then(function(data){
            $scope.assessment = data;
            var averages = [];
            var labels   = [];

            var shortnames = {
              "Teacher Engagement": "TE",
              "Delivery Infrastructure": "DI",
              "High Quality Content and Tools": "HQ",
              "PD Process": "PP",
              "Supportive Policies": "SP",
              "Leadership Capacity": "LC",
              "Data Infrastructure": "DTI",
              "Resource Optimization": "RO"
            };

            angular.forEach(data.averages, function(value, key) {
              labels.push(shortnames[key]);
              averages.push(value);
            });
        });
      };

      $scope.addParticipant = function(user) {
        Participant.save({assessment_id: $scope.id}, {user_id: user.id})
        $scope.updateParticipantsList();
        $scope.updateAssessment();
      }

      $scope.updateAssessment();
      $scope.updateParticipantsList();


      $scope.messageTitle = function(category) {
        switch(category) {
          case 'welcome':
            return 'Welcome Invite';
          case 'reminder':
            return 'Individual Assessment Reminder';
          default:
            return 'General Message';
        }
      }

      $scope.messageIcon = function(category) {
        switch(category) {
          case 'welcome':
            return 'fa-envelope-o';
          case 'reminder':
            return 'fa-clock-o';
          default:
            return 'fa-envelope-o';
        }
      }

      $scope.statusMessageIcon = function(status) {
        switch(status) {
          case 'invited':
            return 'fa-envelope-o';
          case 'completed':
            return 'fa-check';
          case 'in_progress':
            return 'fa-spinner';
          default:
            return 'fa-envelope-o';
        }
      }
    }
]);
