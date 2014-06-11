PDRClient.controller('AssessmentDashboardSidebarCtrl', ['$scope', '$timeout', 'SessionService', 'Assessment', '$stateParams', 'Participant',
    function($scope, $timeout, SessionService, Assessment, $stateParams, Participant) {
      $scope.id = $stateParams.id;

      $scope.assessment = Assessment.get({id: $scope.id});

      $scope.preDateTable = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return moment().isBefore($scope.assessment.meeting_date);
        }
      }

      $scope.postDateTable = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return moment().isAfter($scope.assessment.meeting_date);
        }
      }

      $scope.meetingDateDaysAgo = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return moment().diff($scope.assessment.meeting_date, 'days');
        }
      }

      $scope.postMeetingDate = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          if ($scope.assessment.overview.link == "edit_consensus") {
            return moment().isAfter($scope.assessment.meeting_date);
          }
        }
      }

      $scope.preMeetingDate = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          if ($scope.assessment.overview.link == "edit_consensus") {
            return moment().isBefore($scope.assessment.meeting_date);
          }
        }
      }

      $scope.noMeetingDate = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          if ($scope.assessment.overview.link == "view_consensus") {
            return $scope.assessment.meeting_date == null;
          }
        }
      }

      $scope.reportPresent = function() {
        if(typeof $scope.assessment.overview !== "undefined") {
          return $scope.assessment.overview.link == "view_consensus";
        }
      }

      $scope.meetingDayNumber = function() {
        return moment($scope.assessment.meeting_date).format("D");
      }

      $scope.meetingDayName = function() {
          return moment($scope.assessment.meeting_date).format("dddd");
      }

      $scope.meetingMonthName = function() {
          return moment($scope.assessment.meeting_date).format("MMM");
      }

    }
]);


