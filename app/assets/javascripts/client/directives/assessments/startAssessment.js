PDRClient.directive('startAssessment', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/start_assessment.html',
        controller: [
          '$scope',
          '$timeout',
          '$location',
          'Rubric',
          'Assessment',
          'SessionService',
          function($scope, $timeout, $location, Rubric, Assessment, SessionService){

          $scope.alerts  = [];
          $scope.assessment = {};
          Rubric
            .query({})
            .$promise
            .then(function(data){ 
                $scope.rubrics = data; 
                $scope.rubric  = data[0];
            });


          $scope.isAdmin = function() {
            var user = SessionService.getCurrentUser();
            if(user && user.role != 'member') { return true }
            return false;
          };

          $scope.hideModal = function() { 
            $('#startAssessment').modal('hide');
          }

          $scope.redirectToAssessment = function(assessment) {
            $scope.hideModal();
            $location.path('assessments/' + assessment.id + '/assign');
          }

          $scope.create  = function(assessment) {
            if($scope.rubric)
              assessment.rubric_id = $scope.rubric.id;
            assessment.due_date = moment($("#due-date").val()).toISOString();

            Assessment
              .create(assessment)
              .$promise
              .then(function(data) {
                $scope.success('Assessment Created.');
                $scope.redirectToAssessment(data);
              }, function(response) {
                var errors = response.data.errors;
                angular.forEach(errors, function(error, field) { 
                  $scope.error(field + " : " + error);
                });
              });
          }

          $scope.success = function(message) {
            $scope.alerts.push({type: 'success', msg: message });
          };

          $scope.error   = function(message) {
            $scope.alerts.push({type: 'danger', msg: message });
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };

          $timeout(function() {
            $scope.datetime = $('.datetime').datetimepicker({
              pickTime: false,
            });
          });
        }],
      }
    }
]);
