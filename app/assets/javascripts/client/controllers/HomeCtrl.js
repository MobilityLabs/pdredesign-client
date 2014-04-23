PDRClient.controller('HomeCtrl', ['$scope','ToolKit', 
    function($scope, ToolKit) {
      $scope.toolKits  = [] 
      $scope.user_name = "Sumeet";

      ToolKit.query({}, function(t) {
        $scope.toolKits = t;
      });

    }
]);
