PDRClient.controller('AssessmentDashboardSidebarCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;

      $scope.assessment = Assessment.get({id: $scope.id});

      $scope.meetingDateHeld = function() {
        return moment().isAfter($scope.assessment.meeting_date)
      }

      $scope.meetingDateNotHeld = function() {
        return moment().isBefore($scope.assessment.meeting_date)
      }
      $scope.meetingDateNone = function() {
        return $scope.assessment.meeting_date == null
      }

      $scope.meetingDayNumber = function() {
        return moment($scope.assessment.meeting_date).format("D");
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

      $scope.showScheduleConsensusMeeting = function() {
        return moment().isBefore($scope.assessment.meeting_date)
      }

      $scope.meetingDayName = function() {
          return moment($scope.assessment.meeting_date).format("dddd");
      }

      $scope.meetingMonthName = function() {
          return moment($scope.assessment.meeting_date).format("MMM");
      }

    }
]);


