PDRClient.controller('SettingsCtrl', ['$scope', 'User', 'SessionService', 'UrlService',
    function($scope, User, SessionService, UrlService) {
      $scope.user = {};
      $scope.user = User.get();

      ///REFACTOR!
    }
]);
