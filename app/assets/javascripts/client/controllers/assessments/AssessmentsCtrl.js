PDRClient.controller('AssessmentsCtrl', ['$scope', 'SessionService', 'Assessment',
    function($scope, SessionService, Assessment) {

      $scope.assessments = Assessment.query();
      $scope.user        = SessionService.getCurrentUser();
      $scope.role        = $scope.user.role;

      $scope.roundNumber = function(number) {
        return Math.floor(number);
      }

      $scope.meetingTime = function(date) {
        if (date !== null) {
          return moment(date).format("Do MMM YYYY");
        }
        return "TBD"
      }

      $scope.backgroundColor = function(assessment) {
        if(assessment.status == "draft")
          return '#b1bbbf';
        else if(assessment.status == "assessment")
          return $scope.percentBackgroundColor(assessment.percent_completed);
        return "#4e5e66";
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