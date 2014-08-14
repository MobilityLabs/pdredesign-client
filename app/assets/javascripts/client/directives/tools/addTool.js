PDRClient.directive('addTool', [
    function() {
      return {
        restrict: 'E',
        scope: {
          tools: '='
        },
        templateUrl: 'client/views/directives/add_tool.html',
        controller: [
          '$scope',
          '$timeout',
          '$location',
          'Tool',
          'SessionService',
          function($scope, $timeout, $location, Tool, SessionService){
            $scope.alerts  = [];
            $scope.tool    = {};
            $scope.categories = [];
            

            $scope.$watch('tools', function() {
              if(!$scope.tools)
                return;
              angular.forEach($scope.tools, function(tool) {
                angular.forEach(tool.categories, function(category) {
                  angular.forEach(category.subcategories, function(subcategory) {
                    $scope.categories.push({id: subcategory.id, title: subcategory.name});
                  });
                });
              });

            });

            $scope.hideModal = function() { 
              $('#addTool').modal('hide');
            }

            $scope.create  = function(tool) {
              Tool
                .create(tool)
                .$promise
                .then(function(data) {
                  $scope.success('Tool Created.');
                  $scope.$emit('updated_tools');
                  $scope.hideModal();
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

        }],
      }
    }
]);
