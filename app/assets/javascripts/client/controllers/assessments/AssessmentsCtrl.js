PDRClient.controller('AssessmentsCtrl', ['$scope', 'SessionService', 'assessments',
    function($scope, SessionService, assessments) {

      $scope.assessments = assessments;
      $scope.user        = SessionService.getCurrentUser();
      $scope.role        = $scope.user.role;

      $scope.consensusReportIcon = function(assessment) {
        if (assessment.links['report']['active'] == true)
          return 'fa-check';

        return 'fa-spinner';
      }

      $scope.roundNumber = function(number) {
        return Math.floor(number);
      }

      $scope.meetingTime = function(date) {
        if(date != null)
          return moment(date).format("Do MMM YYYY");

        return "TBD"
      }

      $scope.backgroundColor = function(assessment) {
        if(assessment.status == "draft")
          return '#b1bbbf';
        else if(assessment.status == "assessment")
          return $scope.percentBackgroundColor(assessment.percent_completed);
        return "#4e5e66";
      }

      $scope.responseLink = function(assessment) {
        if(assessment.status == "consensus" && assessment.consensus.submitted_at)
          return '#/assessments/' + assessment.id + '/consensus/' + assessment.consensus.id;

        if(assessment.status == "assessment") {
          if(_.isEmpty(assessment.responses))
            return '#/assessments/' + assessment.id + '/dashboard'
          else
            return '#/assessments/' + assessment.id + '/responses/' + assessment.responses[0].id;
        }
        return '#/assessments';
      }

      $scope.responseLinkDisabled = function(assessment) {
        if(_.isEmpty(assessment.responses) && !assessment.is_participant)
          return true;
        return false;
      }

      $scope.percentBackgroundColor = function(percent) {
        switch(true) {
          case percent < 20:
            return '#f7bcb9';
          case percent  < 40:
            return '#f29b95';
          case percent < 60:
            return '#ee7972';
          case percent < 80:
            return '#046262';
          default:
            return '#884541';
        }
      }
    }
]);
