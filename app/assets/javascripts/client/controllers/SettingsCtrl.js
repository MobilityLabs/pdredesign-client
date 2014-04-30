PDRClient.controller('SettingsCtrl', ['$scope', 'User',
    function($scope, User) {
      $scope.user = {};
      $(document).ready(function() { 
        $("#districts").select2();
      });
    }
]);
