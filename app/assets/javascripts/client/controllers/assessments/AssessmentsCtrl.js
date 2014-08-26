PDRClient.controller('AssessmentsCtrl', ['$scope', '$location', 'SessionService', 'assessments',
    function($scope, $location, SessionService, assessments) {

      $scope.assessments    = assessments;
      $scope.user           = SessionService.getCurrentUser();
      $scope.role           = null;

      $scope.$watch('user', function(){
        if(!$scope.user) return;

        $scope.role = $scope.user.role;
      });

      $scope.isNetworkPartner = function() {
        return SessionService.isNetworkPartner();
      };

      $scope.consensusReportIcon = function(assessment) {
        if (assessment.consensus && assessment.consensus.is_complete)
          return 'fa-check';

        return 'fa-spinner';
      };

      $scope.permissionTypes = ["Facilitator", "Participant"];
      $scope.permissionsFilter = function(filter){
        if(filter == "Participant")
          return {is_participant: true};

        if(filter == "Facilitator")
          return {is_facilitator: true};
      };

      $scope.roundNumber = function(number) {
        return Math.floor(number);
      };

      $scope.meetingTime = function(date) {
        if(date != null)
          return moment(date).format("Do MMM YYYY");

        return "TBD"
      };

      $scope.backgroundColor = function(assessment) {
        if(assessment.status == "draft")
          return '#b1bbbf';
        else if(assessment.status == "assessment")
          return $scope.percentBackgroundColor(assessment.percent_completed);
        return "#4e5e66";
      };

      $scope.gotoLocation = function(location) {
        if(location)
          $location.url(location);
      };

      $scope.activeAssessmentLink = function(assessment) {
        if($scope.responseLink(assessment))
          return 'active';
        return '';
      };

      $scope.responseLink = function(assessment) {
        switch(assessment.response_link) {
          case 'new_response':
            return '/assessments/' + assessment.id + '/responses';
          case 'response':
            return '/assessments/' + assessment.id + '/responses/' + assessment.responses[0].id;
          case 'consensus':
            return '/assessments/' + assessment.id + '/consensus/' + assessment.consensus.id;
          case 'none':
            return false;
        }
      };

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
