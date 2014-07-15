PDRClient.directive('districtSelect', ['SessionService', 'UrlService', '$timeout',
    function(SessionService, UrlService, $timeout) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/district_select.html',
        link: function(scope, elm, attrs) {
          $timeout(function() {
            var maxItems = 1;
            
            if(attrs.multiple == "true")
              maxItems = 20;

            scope.selectize = $('#districts').selectize({
              valueField:  'id',
              labelField:  'text',
              searchField: 'text',
              maxItems:    maxItems,
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

          attrs.$observe('districtId', function() {
            if(!scope.selectize || !attrs.districtText || !attrs.districtId) return;

            var districtId   = 1;
            var districtText = attrs.districtText;

            scope.selectize[0].selectize.addOption({id: districtId, text: districtText});
            scope.selectize[0].selectize.setValue(districtId);
          });

        },
     }
}]);
