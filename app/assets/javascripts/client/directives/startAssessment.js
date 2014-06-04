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
          $scope.rubrics = Rubric.query({});
          $scope.alerts  = [];
          $scope.assessment = {};

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
            if(assessment.rubric_id)
              assessment.rubric_id = assessment.rubric_id.id;
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
              minuteStepping: 15,
              useSeconds: false,
              icons: { time: "fa fa-clock-o", date: "fa fa-calendar",
                up: "fa fa-arrow-up", down: "fa fa-arrow-down" }
            });
          });
        }],
      }
    }
]);
