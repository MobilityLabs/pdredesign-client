PDRClient.controller('SettingsCtrl', ['$scope', 'User', 'SessionService', 'UrlService',
    function($scope, User, SessionService, UrlService) {
      $scope.currentUser = SessionService.getCurrentUser();

      if($scope.currentUser)
        $scope.role = $scope.currentUser.role;
      else
        $scope.role = 'member';

      $scope.user = {};
      window.user = $scope.user;

      $scope.facilitatorSelector = {
        allowClear: true,
        placeholder: "District*",
        ajax: {
          url: UrlService.url('districts/search'),
          data: function (term) { return { query: term }; },
          results: function (data) { return data; }
        },
      };

      $scope.memberSelector = {};
      for(key in $scope.facilitatorSelector) {
        $scope.memberSelector[key] = $scope.facilitatorSelector[key];
      }
      $scope.memberSelector.maximumSelectionSize =  1;
    }
]);
