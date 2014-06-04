PDRClient.directive('districtSelect', ['SessionService', 'UrlService', '$timeout',
    function(SessionService, UrlService, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        require: 'ngModel',
        scope: {
          ngModel: '='
        },
        templateUrl: 'client/views/directives/district_select.html',
        link: function(scope, elm, attrs) {
          scope.facilitatorSelector = {
            allowClear: true,
            multiple: true,
            placeholder: "District*",
            ajax: {
              url: UrlService.url('districts/search'),
              data: function(term) { return { query: term }; },
              results: function(data) { return data; },
            },
          };
          scope.memberSelector = {};

          for(key in scope.facilitatorSelector)
            scope.memberSelector[key] = scope.facilitatorSelector[key];

          scope.memberSelector.maximumSelectionSize =  1;

          $timeout(function() {
            elm
              .find("#districts")
              .select2(scope[attrs.role + "Selector"]);
          }, 500);
        },
     }
    }
]);
