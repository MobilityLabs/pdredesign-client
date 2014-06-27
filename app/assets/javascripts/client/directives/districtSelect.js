PDRClient.directive('districtSelect', ['SessionService', 'UrlService', '$timeout',
    function(SessionService, UrlService, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/district_select.html',
        link: function(scope, elm, attrs) {
          $timeout(function() {
            $('#districts').selectize({
              valueField:  'id',
              labelField:  'text',
              searchField: 'text',
              maxItems:    1,
              create:      false,
              render: {
                option: function(item, escape) {
                  return '<div>' + item.text + '</div>';
                }
              },
              load: function(query, callback) {
                if (!query.length) return callback();
                $.ajax({
                  url: UrlService.url('districts/search') + '?query=' + encodeURIComponent(query),
                  type: 'GET',
                  error: function() {
                    callback();
                  },
                  success: function(res) {
                    callback(res.results);
                  }
                });
              }
            });

          });
        },
     }
}]);
