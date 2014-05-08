PDRClient.controller('AssessmentsCtrl', ['$scope', 'SessionService', 'Assessment',
    function($scope, SessionService, Assessment) {

      $scope.assessments = Assessment.query();
      $scope.currentUser = SessionService.getCurrentUser();
      $scope.role        = "facilitator";

      $scope.roundNumber = function(number) {
          return Math.floor(number);
      }

      $scope.meetingTime = function(assessment){
        if (assessment.meeting_date !== null){
          return convertDate(assessment.meeting_date)
        }
        else {
          return "TBD"
        }
      }

      $scope.backGroundColor = function(assessment){

        if(assessment.status == "draft"){
          return '#b1bbbf';
        } else if (assessment.status == 'assessment') {


            if (assessment.percent_completed < 20) {
              return '#f7bcb9';
            };
            if (assessment.percent_completed < 40) {
              return '#f29b95';
            };
            if (assessment.percent_completed < 60) {
              return '#ee7972';
            };
            if (assessment.percent_completed < 80) {
              return '#046262';
            }
              else{
                return  '#884541';
              };
        }
        else
        {
          return '#4e5e66';
        }
      }

      function convertDate(inputFormat) {
        var monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        var month =  monthNames[d.getMonth()]
        return [pad(d.getDate()+1), month, d.getFullYear()].join(' ');
      }

    }
]);
