PDRClient.controller('ResetPasswordCtrl', [
  '$scope',
  '$timeout',
  '$resource',
  '$stateParams',
  '$location',
  'UrlService',
    function($scope, $timeout, $resource, $stateParams, $location, UrlService) {
      $scope.token  = $stateParams.token;
      $scope.alerts = [];

      $scope.success = function(message) {
        $scope.alerts.push({type: 'success', msg: message });
      };

      $scope.error   = function(message) {
        $scope.alerts.push({type: 'danger', msg: message });
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.requestReset = function(email) {
        var Request = $resource(UrlService.url('user/request_reset'))
        Request
          .save({email: email})
          .$promise
          .then(function() {
            $scope.success("Reset email will be sent to the associated account"); 
          });
      };

      $scope.resetPassword = function(password, password_confirm) {
        if(password != password_confirm) {
          $scope.error("Password confirmation must match password");
          return;
        }

        var Password = $resource(UrlService.url('user/reset'))
        Password
          .save({password: password, token: $scope.token})
          .$promise
          .then(function(){
            $scope.success("Password reset successfully"); 
            $location.url('/');
          }, function(response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, key) {
              angular.forEach(error, function(e) {
                var message = key + ": " + e;
                $scope.error(message);
              });
           });

              
          });

      };

    }
]);
