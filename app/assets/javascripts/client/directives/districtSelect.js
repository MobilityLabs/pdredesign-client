PDRClient.directive('districtSelect', ['SessionService', 'UrlService',
    function(SessionService, UrlService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/district_select.html',
        link: function(scope, elm, attrs) {
          scope.role = attrs.role;
        },
        controller: ['$scope', '$rootScope', '$location', 
          function($scope, $rootScope, $location) {
            $scope.facilitatorSelector = {
              allowClear: true,
              placeholder: "District*",
              ajax: {
                url: UrlService.url('districts/search'),
                data: function(term) { return { query: term }; },
                results: function(data) { return data; },
              },
            };

            $scope.memberSelector = {};

            for(key in $scope.facilitatorSelector)
              $scope.memberSelector[key] = $scope.facilitatorSelector[key];

            $scope.memberSelector.maximumSelectionSize =  1;
          }],
      }
    }
]);
