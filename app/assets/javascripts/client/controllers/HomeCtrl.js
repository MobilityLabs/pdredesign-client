PDRClient.controller('HomeCtrl', ['$scope','ToolKit', 'SessionService', 
    function($scope, ToolKit, SessionService) {
      $scope.toolKits  = [] 
      $scope.user = SessionService.getCurrentUser();

      ToolKit.query({}, function(t) {
        $scope.toolKits = t;
      });

      SessionService.setUserTemplate(
        $scope, 
        'client/views/home/home_user.html', 
        'client/views/home/home_anon.html'
      );

    }
]);
