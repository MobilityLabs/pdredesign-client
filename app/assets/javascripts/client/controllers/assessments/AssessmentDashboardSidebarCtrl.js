PDRClient.controller('AssessmentDashboardSidebarCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;

      $scope.assessment = Assessment.get({id: $scope.id});

      $scope.meetingDayNumber = function(date) {
        if (date !== null) {
          return moment(date).format("D");
        }
      }

      $scope.showConsensusCreateLink = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return $scope.assessment.overview.link == "edit_consensus";
        }
      }

      $scope.showConsensusViewLink = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return $scope.assessment.overview.link == "view_consensus";
        }
      }


      $scope.showModifyScheduleLink = function() {
        return moment().isBefore($scope.assessment.meeting_date)
      }


      $scope.meetingDayName = function(date) {
        if (date !== null) {
          return moment(date).format("dddd");
        }
      }

      $scope.meetingMonthName = function(date) {
        if (date !== null) {
          return moment(date).format("MMM");
        }
      }

    }
]);


