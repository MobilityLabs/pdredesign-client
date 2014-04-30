PDRClient.controller('SettingsCtrl', ['$scope', 'User', 'SessionService', 'UrlService',
    function($scope, User, SessionService, UrlService) {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.currentUser = SessionService.getCurrentUser();
        });
      }
      $scope.role        = 'member';

      $scope.user = {};

      $scope.facilitatorSelector = {
        allowClear: true,
        maximumSelectionSize: 1,
        placeholder: "District*",
        ajax: {
          url: UrlService.url('districts/search'),
          data: function (term) { return { query: term }; },
          results: function (data) { console.debug(data); return data; }
        },
      };

      $scope.memberSelector = $scope.facilitatorSelector;
    }
]);
